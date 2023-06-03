import 'dart:convert';

List<Hotel> hotelFromJson(String str) =>
    List<Hotel>.from(json.decode(str).map((x) => Hotel.fromJson(x)));

String hotelToJson(List<Hotel> data) =>
    json.encode(List<dynamic>.from(data.map((x) => x.toJson())));

class Hotel {
  Hotel({
    this.id,
    this.name,
    this.type,
    this.city,
    this.address,
    this.latitude,
    this.longitude,
    this.photos,
    this.title,
    this.description,
    this.rooms,
    required this.cheapestPrice,
    this.featured,
    this.phone,
    this.rating,
  });

  String? id;
  String? name;
  String? type;
  String? city;
  String? address;
  String? latitude;
  String? longitude;
  List<String>? photos;
  String? title;
  String? description;
  List<String>? rooms;
  int cheapestPrice;
  bool? featured;
  String? phone;
  double? rating;

  factory Hotel.fromJson(Map<String, dynamic> json) => Hotel(
        id: json["_id"],
        name: json["name"],
        type: json["type"],
        city: json["city"],
        address: json["address"],
        latitude: json["latitude"],
        longitude: json["longitude"],
        photos: List<String>.from(json["photos"].map((x) => x)),
        title: json["title"],
        description: json["description"],
        // rooms: List<String>.from(json["rooms"].map((x) => x)),
        cheapestPrice: json["cheapestPrice"],
        featured: json["featured"],
        phone: json["phone"],
        rating: json["rating"],
      );

  Map<String, dynamic> toJson() => {
        "_id": id,
        "name": name,
        "type": type,
        "city": city,
        "address": address,
        "latitude": latitude,
        "longitude": longitude,
        "photos": List<dynamic>.from(photos!.map((x) => x)),
        "title": title,
        "description": description,
        "rooms": List<dynamic>.from(rooms!.map((x) => x)),
        "cheapestPrice": cheapestPrice,
        "featured": featured,
        "phone": phone,
        "rating": rating,
      };
}
