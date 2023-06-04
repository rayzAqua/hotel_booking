import 'dart:convert';

import 'package:hotel_booking/core/api/api.dart';
import 'package:hotel_booking/core/models/model.event.dart';
import 'package:http/http.dart' as http;

class EventsService {
  Future<List<Event>> getAllEvents() async {
    var api = Api.BaseApi + '/sites/event';
    var response = await http.get(Uri.parse(api));
    if (response.statusCode == 200) {
      List<dynamic> jsonList = jsonDecode(response.body);
      List<Event> EventList =
          jsonList.map((json) => Event.fromJson(json)).toList();
      return EventList;
    } else {
      throw Exception('Request Failed With Status: ${response.statusCode}');
    }
  }
}
