import 'dart:convert';
import 'dart:io';

import 'package:cookie_jar/cookie_jar.dart';
import 'package:flutter/material.dart';
import 'package:hotel_booking/core/api/api.dart';
import 'package:http/http.dart' as http;

final cookieJar = CookieJar();

class AuthenticationNotifier extends ChangeNotifier {
  String? token;
  String? userId;
  String? username;
  String? userPhoto;
  String? userEmail;
  String? userPhone;

  Future<int> login({required String email, required String password}) async {
    final url = Uri.parse('${Api.BaseApi}/auth/login');
    final response = await http.post(
      url,
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'email': email, 'password': password}),
    );
    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      userId = data['_id'];
      username = data['username'];
      userEmail = data['email'];
      userPhone = data['phoneNumber'];
      userPhoto = data['image'];
      final cookies = response.headers['set-cookie'] ?? '';
      final cookieParts = cookies.split(';');
      for (final part in cookieParts) {
        final keyValue = part.split('=');
        if (keyValue[0].trim() == 'access_token') {
          token = keyValue[1].trim();
          break;
        }
      }
      notifyListeners();
      return 0;
    } else if (response.statusCode == 400) {
      return 1;
    } else {
      return 2;
    }
  }

  Future logOut() async {
    token = null;
    userId = null;
    username = null;
    userEmail = null;
    userPhone = null;
    userPhoto = null;
  }

  Future getUserData() async {
    final url = Uri.parse('${Api.BaseApi}/users/id=${userId}');
    final response =
        await http.get(url, headers: {'Cookie': 'access_token=${token}'});
    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      username = data['username'];
      userEmail = data['email'];
      userPhoto = data['image'];
      userPhone = data['phoneNumber'];

      notifyListeners();
    } else {
      throw Exception(response.reasonPhrase);
    }
  }

  Future<bool> updateUserData({
    String? username,
    String? userPhone,
    String? userPhoto,
  }) async {
    final url = Uri.parse('${Api.BaseApi}/users/${userId}');
    final data = ({
      'username': username,
      'phoneNumber': userPhone,
      // 'image': userPhoto,
    });
    final response = await http.put(
      url,
      headers: {
        'Content-Type': 'application/json',
        'Cookie': 'access_token=$token',
      },
      body: jsonEncode(data),
    );
    if (response.statusCode == 200) {
      print('User data updated successfully');
      return true;
    } else {
      throw Exception(response.reasonPhrase);
    }
  }
}
