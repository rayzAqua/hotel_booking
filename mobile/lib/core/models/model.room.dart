class Room {
  String? sId;
  String? name;
  String? type;
  int? maxPeoples;
  int? price;
  int? quantity;
  List<String>? photos;
  String? description;
  String? createdAt;
  String? updatedAt;
  int? iV;

  Room(
      {this.sId,
      this.name,
      this.type,
      this.maxPeoples,
      this.price,
      this.quantity,
      this.photos,
      this.description,
      this.createdAt,
      this.updatedAt,
      this.iV});

  Room.fromJson(Map<String, dynamic> json) {
    sId = json['_id'];
    name = json['name'];
    type = json['type'];
    maxPeoples = json['maxPeoples'];
    price = json['price'];
    quantity = json['quantity'];
    // photos = json['photos'].cast<String>();
    description = json['description'];
    createdAt = json['createdAt'];
    updatedAt = json['updatedAt'];
    iV = json['__v'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['_id'] = this.sId;
    data['name'] = this.name;
    data['type'] = this.type;
    data['maxPeoples'] = this.maxPeoples;
    data['price'] = this.price;
    data['quantity'] = this.quantity;
    // data['photos'] = this.photos;
    data['description'] = this.description;
    data['createdAt'] = this.createdAt;
    data['updatedAt'] = this.updatedAt;
    data['__v'] = this.iV;
    return data;
  }
}
