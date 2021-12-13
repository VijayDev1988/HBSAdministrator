export class RoomDetails {
      roomNumber:string="";
      roomType:number=0;
      isActive:boolean=true;
      hotelId:number=1;

      constructor(private roomTypeId: number = 0 , private active: boolean = true , private hotelValue: number = 1){
            this.roomType = roomTypeId,
            this.hotelId = hotelValue,
            this.isActive = active 

      }
}

export class RoomDetailsList {
      roomNumber:string="";
      bookingDate:Date;
      roomTypeName:string;
      roomType:number;
      status:string
}