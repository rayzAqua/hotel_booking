import 'package:hotel_booking/core/models/model.hotel.dart';
import 'package:hotel_booking/core/models/model.room.dart';

class Booking {
  String? sId;
  Hotel? hotel;
  List<Room>? rooms;
  String? startDate;
  String? endDate;
  bool? isExpires;
  String? createdAt;
  String? updatedAt;
  int? iV;
  int? totalPrice;

  Booking({
    this.sId,
    this.hotel,
    this.rooms,
    this.startDate,
    this.endDate,
    this.isExpires,
    this.createdAt,
    this.updatedAt,
    this.iV,
    this.totalPrice,
  });

  Booking.fromJson(Map<String, dynamic> json) {
    sId = json['_id'];
    hotel = json['hotel'] != null ? new Hotel.fromJson(json['hotel']) : null;
    if (json['rooms'] != null) {
      rooms = <Room>[];
      json['rooms'].forEach((v) {
        rooms!.add(new Room.fromJson(v));
      });
    }
    startDate = json['startDate'];
    endDate = json['endDate'];
    isExpires = json['isExpires'];
    createdAt = json['createdAt'];
    updatedAt = json['updatedAt'];
    iV = json['__v'];
    totalPrice = json['totalPrice'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['_id'] = this.sId;
    if (this.hotel != null) {
      data['hotel'] = this.hotel!.toJson();
    }
    if (this.rooms != null) {
      data['rooms'] = this.rooms!.map((v) => v.toJson()).toList();
    }
    data['startDate'] = this.startDate;
    data['endDate'] = this.endDate;
    data['isExpires'] = this.isExpires;
    data['createdAt'] = this.createdAt;
    data['updatedAt'] = this.updatedAt;
    data['__v'] = this.iV;
    data['totalPrice'] = this.totalPrice;
    return data;
  }
}
