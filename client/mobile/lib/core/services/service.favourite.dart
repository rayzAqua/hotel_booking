import 'dart:convert';

import 'package:hotel_booking/core/api/api.dart';
import 'package:hotel_booking/core/models/model.favourite.dart';
import 'package:http/http.dart' as http;

class FavouriteService {
  Future<List<Favourite>> getAllFavourite(
      {required String userId, required String token}) async {
    var api = Api.BaseApi + '/sites/favorite/$userId/all-hotels';
    var response = await http.get(
      Uri.parse(api),
      headers: {
        'Content-type': 'application/json',
        'Cookie': 'access_token=$token',
      },
    );
    if (response.statusCode == 200) {
      List<dynamic> jsonList = jsonDecode(response.body);
      List<Favourite> favouriteList =
          jsonList.map((json) => Favourite.fromJson(json)).toList();
      return favouriteList;
    } else {
      throw Exception('Request failed with status: ${response.statusCode}.');
    }
  }

  Future<int> addToFavourite({
    required String userId,
    required String token,
    required String hotelId,
  }) async {
    var api = Api.BaseApi + '/sites/favorite/$userId/add/$hotelId';
    var response = await http.put(
      Uri.parse(api),
      headers: {
        'Content-type': 'application/json',
        'Cookie': 'access_token=$token',
      },
    );
    if (response.statusCode == 200) {
      return 0;
    } else {
      return 1;
    }
  }

  Future<int> deleteFromFavourite({
    required String userId,
    required String token,
    required String hotelId,
  }) async {
    var api = Api.BaseApi + '/sites/favorite/$userId/remove/$hotelId';
    var response = await http.delete(
      Uri.parse(api),
      headers: {
        'Content-type': 'application/json',
        'Cookie': 'access_token=$token',
      },
    );
    if (response.statusCode == 200) {
      return 0;
    } else {
      return 1;
    }
  }
}
