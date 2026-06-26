import dayjs from 'dayjs';
import { createRequire } from 'module';
import Subscription from '../models/subModel.js';

const require = createRequire(import.meta.url);
const { serve } = require('@upstash/workflow/express');
// require is used cause upstash workflow is written with CommonJS

const REMINDERS = [7, 5, 2, 1];

export const sendReminders = serve(async (context) => {
    const { subscriptionId } = context.requestPayload;
    const subscription = await fetchSubscription(context, subscriptionId);

    if (!subscription || subscription.status !== 'active') {
        return;
    }

    const renewalDate = dayjs(subscription.renewalDate);

    if (renewalDate.isBefore(dayjs())) {
        console.log(`Renewal date has passed for subscription ${subscriptionId}. Stopping workflow.`);
        return;
    }

    for (const daysBefore of REMINDERS) {
        const reminderDate = renewalDate.subtract(daysBefore, 'day');
        // renewal date = 22 feb, reminder dates = 15 feb, 17, 20, 21

        if (reminderDate.isAfter(dayjs())) {
            await sleepUntilReminderDate(context, `Reminder ${daysBefore} days before`, reminderDate);
        }

        await triggerReminder(context, `Reminder ${daysBefore} days before`);
    }
});

const fetchSubscription = async (context, subscriptionId) => {
    return await context.run('get subscription', async() => {
        return Subscription.findById(subscriptionId).populate('user', 'name email');
    });
};

const sleepUntilReminderDate = async (context, label, date) => {
    console.log(`Sleeping until ${label} reminder date: ${date.toISOString()}`);
    await context.sleepUntil(label, date.toDate());
};

const triggerReminder = async (context, label) => {
    return await context.run(label, () => {
        console.log(`Triggering ${label} reminder`);
        // send email, SMS etc
    });
};