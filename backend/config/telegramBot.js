import TelegramBot from 'node-telegram-bot-api';
import orderModel from '../models/orderModel.js';
import process from 'process';

const token = process.env.TELEGRAM_BOT_TOKEN;
let bot = null;

if (token) {
    console.log("Initializing Telegram Bot...");
    try {
        bot = new TelegramBot(token, { polling: true });
    } catch (e) {
        console.error("Failed to initialize TelegramBot:", e);
    }

    if (bot) {
        // Handle /start command
        bot.onText(/\/start/, (msg) => {
            const chatId = msg.chat.id;
            console.log("Your Chat ID:", chatId); // Log chat ID for setup
            bot.sendMessage(chatId, `Welcome to the Order Management Bot!\nYour Chat ID is: ${chatId}\n\nPlease add this ID to your .env file as ADMIN_CHAT_ID to receive alerts.`);
        });

        // Handle /help command
        bot.onText(/\/help/, (msg) => {
            const chatId = msg.chat.id;
            const helpText = `
*Available Commands:*
/orders - View all active orders
/processing - View only Processing orders
/help - Show this help message
            `;
            bot.sendMessage(chatId, helpText, { parse_mode: 'Markdown' });
        });

        // Handle /processing command - List only processing orders
        bot.onText(/\/processing/, async (msg) => {
            const chatId = msg.chat.id;
            // Verify admin
            if (process.env.ADMIN_CHAT_ID && chatId.toString() !== process.env.ADMIN_CHAT_ID) {
                return bot.sendMessage(chatId, "Unauthorized access.");
            }

            try {
                // Find orders that are in "Order Processing" status
                const orders = await orderModel.find({
                    status: "Order Processing"
                }).sort({ date: -1 });

                console.log(`Bot fetched ${orders.length} processing orders.`);

                if (orders.length === 0) {
                    return bot.sendMessage(chatId, "📋 No orders currently in *Processing* status.", { parse_mode: 'Markdown' });
                }

                // Send prominent count header first
                const countHeader = `
━━━━━━━━━━━━━━━━━━━━
📊 *PROCESSING ORDERS*
━━━━━━━━━━━━━━━━━━━━
🔢 *Total Count:* ${orders.length} order(s)
━━━━━━━━━━━━━━━━━━━━
                `;
                bot.sendMessage(chatId, countHeader, { parse_mode: 'Markdown' });

                for (const order of orders) {
                    sendOrderMessage(chatId, order);
                }

            } catch (error) {
                console.error("Bot Error:", error);
                bot.sendMessage(chatId, `Error fetching orders: ${error.message}`);
            }
        });

        // Handle /orders command
        bot.onText(/\/orders/, async (msg) => {
            const chatId = msg.chat.id;
            // Verify admin (optional if strictly private) - but good practice
            if (process.env.ADMIN_CHAT_ID && chatId.toString() !== process.env.ADMIN_CHAT_ID) {
                return bot.sendMessage(chatId, "Unauthorized access.");
            }

            try {
                // Find orders that are NOT Delivered or Cancelled
                const orders = await orderModel.find({
                    status: { $nin: ["Delivered", "Cancelled"] }
                }).sort({ date: -1 });

                console.log(`Bot fetched ${orders.length} active orders.`);

                if (orders.length === 0) {
                    return bot.sendMessage(chatId, "No active orders found.");
                }

                // Limit strictly here if needed, but for now show all active
                for (const order of orders) {
                    sendOrderMessage(chatId, order);
                }

            } catch (error) {
                console.error("Bot Error:", error);
                bot.sendMessage(chatId, `Error fetching orders: ${error.message}`);
            }
        });

        // Handle Callback Queries (Button Clicks)
        bot.on('callback_query', async (callbackQuery) => {
            const action = callbackQuery.data;
            const msg = callbackQuery.message;
            const chatId = msg.chat.id;

            // Verify admin
            if (process.env.ADMIN_CHAT_ID && chatId.toString() !== process.env.ADMIN_CHAT_ID) {
                return bot.answerCallbackQuery(callbackQuery.id, { text: "Unauthorized", show_alert: true });
            }

            const [type, orderId, newStatus] = action.split(':');

            if (type === 'STATUS') {
                try {
                    // Get all orders and manually match (workaround for findById issue)
                    const allOrders = await orderModel.find({});
                    const matchingOrder = allOrders.find(o => o._id.toString() === orderId);

                    if (matchingOrder) {
                        // Use mongoose connection directly (same fix as orderController)
                        const mongoose = (await import('mongoose')).default;
                        const db = mongoose.connection.db;
                        const ordersCollection = db.collection('orders');

                        // Try with ObjectId first
                        let result = await ordersCollection.updateOne(
                            { _id: matchingOrder._id },
                            { $set: { status: newStatus } }
                        );

                        // Fallback to string ID if ObjectId fails
                        if (result.matchedCount === 0) {
                            result = await ordersCollection.updateOne(
                                { _id: orderId },
                                { $set: { status: newStatus } }
                            );
                        }

                        if (result.matchedCount > 0) {
                            console.log(`Bot: Order ${orderId.slice(-6)} updated to ${newStatus}`);
                            bot.answerCallbackQuery(callbackQuery.id, { text: `Status updated to ${newStatus}` });
                            bot.sendMessage(chatId, `✅ Order ${orderId.slice(-6).toUpperCase()} updated to *${newStatus}*`, { parse_mode: 'Markdown' });
                        } else {
                            console.error(`Bot: Failed to update order ${orderId}`);
                            bot.answerCallbackQuery(callbackQuery.id, { text: "Update failed", show_alert: true });
                        }
                    } else {
                        bot.answerCallbackQuery(callbackQuery.id, { text: "Order not found", show_alert: true });
                    }

                } catch (error) {
                    console.error("Status Update Error:", error);
                    bot.answerCallbackQuery(callbackQuery.id, { text: "Update failed", show_alert: true });
                }
            }
        });

        console.log("Telegram Bot Initialized Successfully");
    }
} else {
    console.warn("TELEGRAM_BOT_TOKEN not found in .env");
}

// Function to send formatted order message with buttons
const sendOrderMessage = (chatId, order) => {
    if (!bot) return;

    const orderId = order._id.toString();
    const orderDate = order.date ? new Date(order.date).toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short'
    }) : 'Just now';

    // Build detailed items list
    let itemsList = order.items.map((item, idx) =>
        `  ${idx + 1}. ${item.name} × ${item.quantity} — ₹${item.price * item.quantity}`
    ).join('\n');

    const message = `
━━━━━━━━━━━━━━━━━━━━
📦 *ORDER #${orderId.slice(-6).toUpperCase()}*
━━━━━━━━━━━━━━━━━━━━

👤 *Customer:* ${order.address.firstName} ${order.address.lastName}
📞 *Phone:* ${order.address.phone}
📍 *Address:* ${order.address.street}, ${order.address.city}

🛒 *Items:*
${itemsList}

💰 *Total:* ₹${order.amount}
🚚 *Delivery:* ${order.deliveryType || 'Standard'}
📅 *Ordered:* ${orderDate}

📊 *Status:* \`${order.status}\`
━━━━━━━━━━━━━━━━━━━━
    `;

    // Inline Buttons for Status
    const opts = {
        parse_mode: 'Markdown',
        reply_markup: {
            inline_keyboard: [
                [
                    { text: '📋 Processing', callback_data: `STATUS:${orderId}:Order Processing` },
                    { text: '📦 Packing', callback_data: `STATUS:${orderId}:Packing` }
                ],
                [
                    { text: '🚚 Out for Delivery', callback_data: `STATUS:${orderId}:Out for Delivery` },
                    { text: '✅ Delivered', callback_data: `STATUS:${orderId}:Delivered` }
                ]
            ]
        }
    };

    bot.sendMessage(chatId, message, opts);
};

// Export notification function to be used in controllers
export const sendNewOrderNotification = (order) => {
    const adminChatId = process.env.ADMIN_CHAT_ID;
    if (bot && adminChatId) {
        sendOrderMessage(adminChatId, order);
    }
};
