import 'dart:convert';

User userFromJson(String str) => User.fromJson(json.decode(str));

String userToJson(User data) => json.encode(data.toJson());

class User {
  User({
    this.id,
    this.username,
    this.email,
    this.password,
    this.phoneNumber,
    this.image,
    this.isAdmin,
    this.createdAt,
  });

  String? id;
  String? username;
  String? email;
  String? password;
  String? phoneNumber;
  String? image;
  bool? isAdmin;
  DateTime? createdAt;

  factory User.fromJson(Map<String, dynamic> json) => User(
        id: json["_id"],
        username: json["username"],
        email: json["email"],
        password: json["password"],
        phoneNumber: json["phoneNumber"],
        image: json["image"],
        isAdmin: json["isAdmin"],
        createdAt: DateTime.parse(json["createdAt"]),
      );

  Map<String, dynamic> toJson() => {
        "username": username,
        "email": email,
        "password": password,
        "phoneNumber": phoneNumber,
      };
}
