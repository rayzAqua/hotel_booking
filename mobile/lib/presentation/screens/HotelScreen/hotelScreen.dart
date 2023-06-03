import 'package:flutter/material.dart';
import 'package:hotel_booking/app/constants/app.colors.dart';
import 'package:hotel_booking/core/models/model.hotel.dart';
import 'package:hotel_booking/core/notifiers/hotel_notifier.dart';
import 'package:hotel_booking/core/notifiers/theme_notifier.dart';
import 'package:hotel_booking/presentation/screens/HotelScreen/widgets/hotel.widget.dart';
import 'package:provider/provider.dart';

class HotelScreen extends StatelessWidget {
  final HotelScreenArgs hotelScreenArgs;
  HotelScreen({super.key, required this.hotelScreenArgs});

  @override
  Widget build(BuildContext context) {
    ThemeNotifier _themeNotifier =
        Provider.of<ThemeNotifier>(context, listen: true);
    var themeFlag = _themeNotifier.darkTheme;
    return Scaffold(
      backgroundColor: themeFlag ? AppColors.mirage : AppColors.creamColor,
      body: Center(
        child: SingleChildScrollView(
          child: Consumer<HotelNotifier>(
            builder: (context, notifier, _) {
              return FutureBuilder(
                future: notifier.getSpecificHotel(
                    hotelId: hotelScreenArgs.hotel_id),
                builder: (BuildContext context, AsyncSnapshot snapshot) {
                  if (snapshot.connectionState == ConnectionState.waiting ||
                      !snapshot.hasData) {
                    return Center(
                      child: CircularProgressIndicator(),
                    );
                  } else {
                    Hotel _snapshot = snapshot.data as Hotel;
                    Hotel hotelModel = _snapshot;
                    return buildHotelData(
                      context: context,
                      hotelModel: hotelModel,
                      themeFlag: themeFlag,
                    );
                  }
                },
              );
            },
          ),
        ),
      ),
    );
  }
}

class HotelScreenArgs {
  final dynamic hotel_id;

  HotelScreenArgs({
    required this.hotel_id,
  });
}
