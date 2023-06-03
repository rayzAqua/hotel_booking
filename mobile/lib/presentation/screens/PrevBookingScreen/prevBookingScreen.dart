import 'package:flutter/material.dart';
import 'package:hotel_booking/app/constants/app.colors.dart';
import 'package:hotel_booking/app/routes/app.routes.dart';
import 'package:hotel_booking/core/models/model.booking.dart';
import 'package:hotel_booking/core/notifiers/authentication_notifier.dart';
import 'package:hotel_booking/core/notifiers/booking_notifier.dart';
import 'package:hotel_booking/core/notifiers/theme_notifier.dart';
import 'package:hotel_booking/presentation/screens/HotelScreen/hotelScreen.dart';
import 'package:hotel_booking/presentation/screens/PrevBookingScreen/widgets/bookingItem.dart';
import 'package:hotel_booking/presentation/widgets/noData.dart';
import 'package:hotel_booking/presentation/widgets/shimmer_effects.dart';
import 'package:provider/provider.dart';

class PreviousBookingScreen extends StatelessWidget {
  const PreviousBookingScreen({super.key});

  @override
  Widget build(BuildContext context) {
    ThemeNotifier _themeNotifier =
        Provider.of<ThemeNotifier>(context, listen: true);
    var themeFlag = _themeNotifier.darkTheme;
    AuthenticationNotifier _auth =
        Provider.of<AuthenticationNotifier>(context, listen: false);

    return Scaffold(
      backgroundColor: themeFlag ? AppColors.mirage : AppColors.creamColor,
      body: SafeArea(
        child: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.only(
              top: 5,
              bottom: 10,
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Padding(
                  padding: const EdgeInsets.fromLTRB(15, 0, 15, 10),
                  child: Text(
                    'Booking',
                    style: TextStyle(
                      color:
                          themeFlag ? AppColors.creamColor : AppColors.mirage,
                      fontWeight: FontWeight.w600,
                      fontSize: 22,
                    ),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.fromLTRB(15, 0, 15, 10),
                  child: Text(
                    'Your Previous Booking',
                    style: TextStyle(
                      color:
                          themeFlag ? AppColors.creamColor : AppColors.mirage,
                      fontWeight: FontWeight.w500,
                      fontSize: 22,
                    ),
                  ),
                ),
                Consumer<BookingNotifier>(
                  builder: (context, notifier, _) {
                    return FutureBuilder(
                      future: notifier.getSpecificRoom(
                        userId: _auth.userId!,
                        token: _auth.token!,
                      ),
                      builder: (BuildContext context, AsyncSnapshot snapshot) {
                        if (snapshot.connectionState ==
                            ConnectionState.waiting) {
                          return ShimmerEffects.loadBookingItem(
                            context: context,
                          );
                        } else {
                          List _snapshot = snapshot.data as List;
                          if (_snapshot.isEmpty) {
                            return noDataFound(themeFlag: themeFlag);
                          } else {
                            return ListView.builder(
                              shrinkWrap: true,
                              itemCount: snapshot.data.length,
                              itemBuilder: (context, index) {
                                Booking bookingModel = _snapshot[index];
                                return BookingItem(
                                  bookingModel: bookingModel,
                                  themeFlag: themeFlag,
                                  onTap: () {
                                    Navigator.of(context).pushNamed(
                                      AppRouter.hotelDetailRoute,
                                      arguments: HotelScreenArgs(
                                        hotel_id: bookingModel.hotel!.id,
                                      ),
                                    );
                                  },
                                );
                              },
                            );
                          }
                        }
                      },
                    );
                  },
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
