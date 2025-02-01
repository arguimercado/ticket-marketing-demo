
class EventPolicy {
   event: any;
   user: any;
   availability: any;

   constructor(event, user, availability) {
      this.event = event;
      this.user = user;
      this.availability = availability;
   }

   isPastEvent() {
      return this.event.eventDate < Date.now();
   }

   isEventOwner() {
      return this.user?.id === this.event.userId;
   }

   isSoldOut() {
      return this.availability.purchaseCount >= this.availability.totalTickets;
   }
}

export default EventPolicy;