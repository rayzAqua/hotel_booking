import 'package:flutter/material.dart';
import 'package:geocoder/geocoder.dart' as geo_co;
import 'package:geolocator/geolocator.dart';

class MapService with ChangeNotifier {
  String finalAddress = 'Searching...';
  String? countryName;
  String mainAddress = 'Please select any place in order to get address';

  double? intialLat;
  double? intialLong;

  Future getCurrentLocation() async {
    var positionData = await GeolocatorPlatform.instance.getCurrentPosition();
    final coords = geo_co.Coordinates(
      positionData.latitude,
      positionData.longitude,
    );
    intialLat = positionData.latitude;
    intialLong = positionData.longitude;
    var address =
        await geo_co.Geocoder.local.findAddressesFromCoordinates(coords);
    String mainAddress = address.first.addressLine!;
    notifyListeners();
  }
}
