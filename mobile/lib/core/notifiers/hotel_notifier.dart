import 'package:flutter/material.dart';
import 'package:hotel_booking/core/models/model.hotel.dart';
import 'package:hotel_booking/core/notifiers/sorts_notifier.dart';
import 'package:hotel_booking/core/services/service.hotel.dart';

class HotelNotifier extends ChangeNotifier {
  final HotelService hotelService = HotelService();
  Future getAllHotel(
      {required RoomSort roomSort, required SortingSystem sortBy}) async {
    List<Hotel> hotelList = await hotelService.getAllHotel();
    if (sortBy == SortingSystem.ByAscendingOrder) {
      if (roomSort == RoomSort.Normal) {
        return hotelList;
      } else if (roomSort == RoomSort.ByPrice) {
        Comparator<Hotel> priceCom =
            (a, b) => a.cheapestPrice.compareTo(b.cheapestPrice);
        hotelList.sort(priceCom);
        return hotelList;
      } else if (roomSort == RoomSort.ByRating) {
        Comparator<Hotel> ratingCom =
            (a, b) => a.cheapestPrice.compareTo(b.cheapestPrice);
        hotelList.sort(ratingCom);
        return hotelList;
      }
    } else if (sortBy == SortingSystem.ByDescendingOrder) {
      if (roomSort == RoomSort.Normal) {
        return hotelList;
      } else if (roomSort == RoomSort.ByPrice) {
        Comparator<Hotel> priceCom =
            (a, b) => b.cheapestPrice.compareTo(a.cheapestPrice);
        hotelList.sort(priceCom);
        return hotelList;
      } else if (roomSort == RoomSort.ByRating) {
        Comparator<Hotel> ratingCom =
            (a, b) => b.cheapestPrice.compareTo(a.cheapestPrice);
        hotelList.sort(ratingCom);
        return hotelList;
      }
    }
  }

  Future getSearchHotel({required String hotelName}) async {
    var data = await hotelService.getSearchHotel(hotelName: hotelName);
    return data;
  }

  Future getSpecificHotel({required String hotelId}) async {
    var data = await hotelService.getSpecificHotel(hotelId: hotelId);
    return data;
  }
}
