import 'package:flutter/material.dart';
import 'package:hotel_booking/core/models/model.booking.dart';
import 'package:hotel_booking/core/services/service.booking.dart';
import 'package:intl/intl.dart';

class BookingNotifier extends ChangeNotifier {
  final BookingService bookingService = BookingService();

  Future getSpecificRoom(
      {required String userId, required String token}) async {
    var data =
        await bookingService.getBookingData(userId: userId, token: token);
    return data;
  }

  Future<bool> bookHotel(String hotel, String room, int quantity, String userId,
      String token, String startDate, String endDate) async {
    var data = await bookingService.bookHotel(
        hotel, room, quantity, userId, token, startDate, endDate);

    if (data == false) {
      notifyListeners();
      return false;
    } else {
      return true;
    }
  }

  String? startDate = '03-June-2023';
  String? endDate = '03-June-2023';

  void startDateSet({required String createdAt}) {
    startDate = createdAt;
    notifyListeners();
  }

  void endDateSet({required String createdAt}) {
    endDate = createdAt;
    notifyListeners();
  }
}
