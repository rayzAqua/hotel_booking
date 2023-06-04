import 'package:flutter/material.dart';
import 'package:hotel_booking/core/services/service.event.dart';

class EventsNotifier extends ChangeNotifier {
  final EventsService eventsService = EventsService();
  Future getAllEvents() async {
    var data = await eventsService.getAllEvents();
    // notifyListeners();
    return data;
  }
}
