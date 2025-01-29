## Ticketr - Real-time Event Ticketing Platform Demo

A cutting-edge event ticketing platform crafted with Next.js15, Convex, Clerk, and Stripe Connect. It boasts a robust queue system, real-time updates, and secure payment processing

### Features

### For Events Attendees
- 🎫 Real-time ticket availability
- ⚡ Smart queueing system with update position
- 🕒 Time limited ticket offer
- 📱 Mobile friendly ticket management
- 🔒 Secure payment processing
- 📲 Digital tickets QR codes
- 💸 Automatic refund for events cancelled 

### For Event Organizers
- 💰 Direct payments via Stripe Connect
- 📊 Real-time sales monitoring
- 🎯 Automated queue management
- 📈 Event analytics and tracking
- 🔄 Automatic ticket recycling
- 🎟️ Customizable ticket limits
- ❌ Event cancellation with automatic refunds
- 🔄 Bulk refund processing


### Environment Variables
Create `.env.local` file with:

`
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_bmVhdC1ib2FyLTE3LmNsZXJrLmFjY291bnRzLmRldiQ
CLERK_SECRET_KEY=sk_test_FJZNCXVxY8clFFW9k639PS1FSGPj9lUIW3cHY4j0Zi
CONVEX_DEPLOYMENT=dev:next-pheasant-368
NEXT_PUBLIC_CONVEX_URL=https://next-pheasant-368.convex.cloud
`
