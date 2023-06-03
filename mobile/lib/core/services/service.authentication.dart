import 'dart:convert';
import 'package:hotel_booking/core/api/api.dart';
import 'package:http/http.dart' as http;

class AuthenticationService {
  static login(
    String email,
    String password,
  ) async {
    try {
      var api = Api.BaseApi + '/auth/login';
      final body = {
        'email': email,
        'password': password,
      };
      http.Response response = await http.post(
        Uri.parse(api),
        body: jsonEncode(body),
        headers: {
          'Content-type': 'application/json',
        },
      );
      if (response.statusCode == 200) {
        print('OK');
        return 0;
      } else if (response.statusCode == 404) {
        //khong tim thay user
        print('khong tim thay user');
        return 1;
      } else if (response.statusCode == 401) {
        //sai mat khau
        print('sai mat khau');
        return 2;
      } else if (response.statusCode == 400) {
        //xac nhan email
        print('Vui long xac nhan email');
        return 3;
      }
    } catch (e) {
      print(e.toString());
      return 4;
    }
  }

  static register(
    String username,
    String email,
    String password,
    String phoneNumber,
  ) async {
    try {
      var api = Api.BaseApi + '/auth/register';
      final body = {
        'username': username,
        'email': email,
        'password': password,
        'phoneNumber': phoneNumber,
      };
      http.Response response = await http.post(
        Uri.parse(api),
        body: jsonEncode(body),
        headers: {
          'Content-type': 'application/json',
        },
      );
      if (response.statusCode == 200) {
        //dang ky thanh cong
        print('OK');
        return 0;
      } else if (response.statusCode == 500) {
        //Email bi trung
        print('Email bi trung');
        return 1;
      }
    } catch (e) {
      print(e.toString());
      return 3;
    }
  }
}
