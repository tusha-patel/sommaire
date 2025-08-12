import { Variants } from "motion/react";
import { isDev } from "./helpers";


export const PricingPlans = [
    {
        name: 'Basic',
        price: '$9',
        description: 'Perfect for occasional use',
        period: 'month',
        items: [
            '5 PDF summaries per month',
            'Standard processing speed',
            'Email support',
        ],
        id: "basic",
        paymentLink: isDev
            ? 'https://buy.stripe.com/test_fZueV680NcuXbnJdafbMQ00'
            : "https://buy.stripe.com/test_fZueV680NcuXbnJdafbMQ00",
        priceId: isDev
            ? 'price_1Rt5FG4DTiXjIFLXVf0anh3K'
            : "price_1Rt5FG4DTiXjIFLXVf0anh3K",
    },
    {
        name: 'Pro',
        price: '$19',
        description: 'For professionals and teams',
        period: 'month',
        items: [
            'Unlimited PDF summaries',
            'Priority processing',
            '24/7 priority support',
            'Markdown Export',
        ],
        id: "pro",
        paymentLink:
            isDev
                ? 'https://buy.stripe.com/test_eVqbIUbcZ66zcrN5HNbMQ01'
                : "https://buy.stripe.com/test_eVqbIUbcZ66zcrN5HNbMQ01",
        priceId: isDev
            ? 'price_1Rt5J14DTiXjIFLXDiz7MWyi'
            : "price_1Rt5J14DTiXjIFLXDiz7MWyi",
    },
];

export const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1
        }
    }
}

export const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            damping: 10,
            stiffness: 100,
            duration: 0.3,
        }
    }
}   