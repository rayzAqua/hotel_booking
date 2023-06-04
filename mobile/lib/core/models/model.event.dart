class Event {
  String? sId;
  String? name;
  String? eventType;
  String? image;
  String? location;
  String? date;
  int? price;
  String? createdAt;
  String? updatedAt;
  int? iV;

  Event(
      {this.sId,
      this.name,
      this.eventType,
      this.image,
      this.location,
      this.date,
      this.price,
      this.createdAt,
      this.updatedAt,
      this.iV});

  Event.fromJson(Map<String, dynamic> json) {
    sId = json['_id'];
    name = json['name'];
    eventType = json['eventType'];
    image = json['image'];
    location = json['location'];
    date = json['date'];
    price = json['price'];
    createdAt = json['createdAt'];
    updatedAt = json['updatedAt'];
    iV = json['__v'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['_id'] = this.sId;
    data['name'] = this.name;
    data['eventType'] = this.eventType;
    data['image'] = this.image;
    data['location'] = this.location;
    data['date'] = this.date;
    data['price'] = this.price;
    data['createdAt'] = this.createdAt;
    data['updatedAt'] = this.updatedAt;
    data['__v'] = this.iV;
    return data;
  }
}
