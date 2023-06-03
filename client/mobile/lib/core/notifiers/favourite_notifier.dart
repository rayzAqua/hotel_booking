import 'package:flutter/material.dart';
import 'package:hotel_booking/core/services/service.favourite.dart';

class FavouriteNotifier extends ChangeNotifier {
  String? error;
  final FavouriteService favouriteService = FavouriteService();

  Future getAllFavourite(
      {required String userId, required String token}) async {
    var data =
        await favouriteService.getAllFavourite(userId: userId, token: token);
    return data;
  }

  Future<bool> addToFavourite({
    required String userId,
    required String token,
    required String hotelId,
  }) async {
    var data = await favouriteService.addToFavourite(
      userId: userId,
      token: token,
      hotelId: hotelId,
    );
    if (data == 0) {
      return true;
    } else {
      return false;
    }
  }

  Future<bool> deleteFromFavourite({
    required String userId,
    required String token,
    required String hotelId,
  }) async {
    var data = await favouriteService.deleteFromFavourite(
        hotelId: hotelId, token: token, userId: userId);
    if (data == 0) {
      notifyListeners();
      return true;
    } else {
      notifyListeners();
      return false;
    }
  }
}
