import 'dart:convert';
import 'package:hotel_booking/core/api/api.dart';
import 'package:hotel_booking/core/models/model.booking.dart';
import 'package:hotel_booking/core/models/model.room.dart';
import 'package:http/http.dart' as http;

class BookingService {
  Future<List<Booking>> getBookingData(
      {required String userId, required String token}) async {
    var api = Api.BaseApi + '/users/all-bookings/$userId';
    var response = await http.get(
      Uri.parse(api),
      headers: {
        'Content-type': 'application/json',
        'Cookie': 'access_token=$token',
      },
    );
    if (response.statusCode == 200) {
      List<dynamic> jsonList = jsonDecode(response.body);
      List<Booking> bookingList =
          jsonList.map((json) => Booking.fromJson(json)).toList();
      return bookingList;
    } else {
      throw Exception('Request failed with status: ${response.statusCode}.');
    }
  }

  Future<bool> bookHotel(String hotel, String room, int quantity, String userId,
      String token, String startDate, String endDate) async {
    final url = Uri.parse(Api.BaseApi + '/bookings/' + userId);
    final payload = {
      'hotel': hotel,
      'rooms': [
        {
          'room': room,
          'quantity': quantity,
        }
      ],
      'startDate': startDate,
      'endDate': endDate,
    };

    final response = await http.post(
      url,
      headers: {
        'Content-Type': 'application/json',
        'Cookie': 'access_token=$token',
      },
      body: json.encode(payload),
    );

    if (response.statusCode == 200) {
      return true;
    } else {
      return false;
    }
  }
}
