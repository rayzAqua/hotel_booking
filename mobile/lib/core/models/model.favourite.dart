class Favourite {
  String? sId;
  String? name;
  String? type;
  String? city;
  String? phone;
  String? address;
  String? latitude;
  String? longitude;
  List<String>? photos;
  String? title;
  String? description;
  double? rating;
  int? cheapestPrice;
  bool? featured;
  int? iV;

  Favourite({
    this.sId,
    this.name,
    this.type,
    this.city,
    this.phone,
    this.address,
    this.latitude,
    this.longitude,
    this.photos,
    this.title,
    this.description,
    this.rating,
    this.cheapestPrice,
    this.featured,
    this.iV,
  });

  Favourite.fromJson(Map<String, dynamic> json) {
    sId = json['_id'];
    name = json['name'];
    type = json['type'];
    city = json['city'];
    phone = json['phone'];
    address = json['address'];
    latitude = json['latitude'];
    longitude = json['longitude'];
    photos = json['photos'].cast<String>();
    title = json['title'];
    description = json['description'];
    rating = json['rating'];

    cheapestPrice = json['cheapestPrice'];
    featured = json['featured'];
    iV = json['__v'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['_id'] = this.sId;
    data['name'] = this.name;
    data['type'] = this.type;
    data['city'] = this.city;
    data['phone'] = this.phone;
    data['address'] = this.address;
    data['latitude'] = this.latitude;
    data['longitude'] = this.longitude;
    data['photos'] = this.photos;
    data['title'] = this.title;
    data['description'] = this.description;
    data['rating'] = this.rating;
    data['cheapestPrice'] = this.cheapestPrice;
    data['featured'] = this.featured;
    data['__v'] = this.iV;
    return data;
  }
}
