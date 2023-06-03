import 'package:flutter/material.dart';
import 'package:hotel_booking/app/constants/app.colors.dart';
import 'package:hotel_booking/app/routes/app.routes.dart';
import 'package:hotel_booking/core/models/model.hotel.dart';
import 'package:hotel_booking/core/notifiers/authentication_notifier.dart';
import 'package:hotel_booking/presentation/screens/BookingScreen/bookingScreen.dart';
import 'package:map_launcher/map_launcher.dart';
import 'package:provider/provider.dart';
import 'package:url_launcher/url_launcher.dart';

class HotelFooter extends StatelessWidget {
  final Hotel hotelModel;

  HotelFooter({super.key, required this.hotelModel});

  @override
  Widget build(BuildContext context) {
    var userID =
        Provider.of<AuthenticationNotifier>(context, listen: false).userId;
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        GestureDetector(
          onTap: () async {
            final availableMaps = await MapLauncher.installedMaps;
            await availableMaps.first.showMarker(
              coords: Coords(
                double.parse(hotelModel.latitude!),
                double.parse(hotelModel.longitude!),
              ),
              title: hotelModel.name!,
            );
          },
          child: Container(
            height: 40,
            width: 40,
            decoration: BoxDecoration(
              color: Colors.green.shade200,
              borderRadius: BorderRadius.circular(30),
            ),
            child: const Icon(
              Icons.pin_drop,
              color: Colors.white,
              size: 18,
            ),
          ),
        ),
        const Spacer(),
        GestureDetector(
          onTap: () {
            final Uri _url = Uri.parse('Tel://${hotelModel.phone}');
            launchUrl(_url);
          },
          child: Container(
            height: 40,
            width: 40,
            decoration: BoxDecoration(
              color: Colors.red.shade200,
              borderRadius: BorderRadius.circular(30),
            ),
            child: const Icon(
              Icons.phone,
              color: Colors.white,
              size: 18,
            ),
          ),
        ),
        const Spacer(),
        Expanded(
          flex: 15,
          child: ElevatedButton(
            onPressed: () {
              Navigator.of(context).pushNamed(
                AppRouter.bookingRoute,
                arguments: BookingScreenArgs(
                  userID: userID,
                  hotelData: hotelModel,
                ),
              );
            },
            style: ElevatedButton.styleFrom(
              primary: AppColors.yellowish,
            ),
            child: const Text(
              'Book Now',
              style: TextStyle(
                color: Colors.white,
              ),
            ),
          ),
        ),
      ],
    );
  }
}
