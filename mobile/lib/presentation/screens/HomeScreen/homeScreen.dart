import 'package:flutter/material.dart';
import 'package:hotel_booking/app/constants/app.colors.dart';
import 'package:hotel_booking/app/routes/app.routes.dart';
import 'package:hotel_booking/core/models/model.event.dart';
import 'package:hotel_booking/core/models/model.hotel.dart';
import 'package:hotel_booking/core/notifiers/authentication_notifier.dart';
import 'package:hotel_booking/core/notifiers/event_notifier.dart';
import 'package:hotel_booking/core/notifiers/favourite_notifier.dart';
import 'package:hotel_booking/core/notifiers/hotel_notifier.dart';
import 'package:hotel_booking/core/notifiers/sorts_notifier.dart';
import 'package:hotel_booking/core/notifiers/theme_notifier.dart';
import 'package:hotel_booking/presentation/screens/HomeScreen/widgets/events_widget.dart';
import 'package:hotel_booking/presentation/screens/HomeScreen/widgets/feature_widget.dart';
import 'package:hotel_booking/presentation/screens/HotelScreen/hotelScreen.dart';
import 'package:hotel_booking/presentation/widgets/custom_snackbar.dart';
import 'package:hotel_booking/presentation/widgets/shimmer_effects.dart';
import 'package:provider/provider.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    ThemeNotifier _themeNotifier =
        Provider.of<ThemeNotifier>(context, listen: true);
    AuthenticationNotifier _auth =
        Provider.of<AuthenticationNotifier>(context, listen: true);
    var themeFlag = _themeNotifier.darkTheme;
    double _height = MediaQuery.of(context).size.height / 815;
    return Scaffold(
      backgroundColor: themeFlag ? AppColors.mirage : AppColors.creamColor,
      body: SafeArea(
        child: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.only(top: 5, bottom: 10),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Padding(
                  padding: const EdgeInsets.fromLTRB(15, 10, 15, 10),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(
                        "Hi! ${_auth.username ?? 'User'}",
                        style: TextStyle(
                          color: themeFlag
                              ? AppColors.creamColor
                              : AppColors.mirage,
                          fontSize: 22,
                        ),
                      ),
                      const SizedBox(
                        height: 10,
                      ),
                      Text(
                        "Find and Book",
                        style: TextStyle(
                          color: themeFlag
                              ? AppColors.creamColor
                              : AppColors.mirage,
                          fontSize: 14,
                        ),
                      ),
                      Text(
                        "The Best Hotel",
                        style: TextStyle(
                          color: themeFlag
                              ? AppColors.creamColor
                              : AppColors.mirage,
                          fontSize: 22,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(
                            "Featured",
                            style: TextStyle(
                              color: themeFlag
                                  ? AppColors.creamColor
                                  : AppColors.mirage,
                              fontSize: 22,
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                          InkWell(
                            onTap: () {
                              Navigator.of(context).pushNamed(
                                AppRouter.allHotelRoute,
                              );
                            },
                            child: Text(
                              "See All",
                              style: TextStyle(
                                height: 3,
                                color: AppColors.yellowish,
                                fontWeight: FontWeight.w500,
                                decoration: TextDecoration.underline,
                                fontSize: 14,
                              ),
                            ),
                          )
                        ],
                      )
                    ],
                  ),
                ),
                Container(
                  height: _height * 280,
                  child: Consumer<HotelNotifier>(
                    builder: (context, notifier, _) {
                      return FutureBuilder(
                        future: notifier.getAllHotel(
                            roomSort: RoomSort.Normal,
                            sortBy: SortingSystem.ByAscendingOrder),
                        builder:
                            (BuildContext context, AsyncSnapshot snapshot) {
                          if (snapshot.connectionState ==
                                  ConnectionState.waiting ||
                              !snapshot.hasData) {
                            return ShimmerEffects.loadShimmerHome(
                              context: context,
                            );
                          } else {
                            List _snapshot = snapshot.data as List;
                            return ListView.builder(
                              shrinkWrap: true,
                              itemCount: 4,
                              scrollDirection: Axis.horizontal,
                              itemBuilder: (context, index) {
                                Hotel hotelModel = _snapshot[index];
                                return FeatureHotel(
                                  hotelModel: hotelModel,
                                  onTapFavorite: () async {
                                    var data = Provider.of<FavouriteNotifier>(
                                        context,
                                        listen: false);
                                    bool isAdded = await data.addToFavourite(
                                      userId: _auth.userId!,
                                      token: _auth.token!,
                                      hotelId: hotelModel.id!,
                                    );
                                    print(isAdded);
                                    if (isAdded) {
                                      SnackUtil.showSnackBar(
                                        context: context,
                                        text: 'Added to Favourite',
                                        textColor: AppColors.creamColor,
                                        backgroundColor: Colors.green,
                                      );
                                    } else {
                                      SnackUtil.showSnackBar(
                                        context: context,
                                        text:
                                            'Hotel has been added to favorites',
                                        textColor: AppColors.creamColor,
                                        backgroundColor: Colors.red,
                                      );
                                    }
                                  },
                                  onTap: () {
                                    Navigator.of(context).pushNamed(
                                      AppRouter.hotelDetailRoute,
                                      arguments: HotelScreenArgs(
                                        hotel_id: hotelModel.id,
                                      ),
                                    );
                                  },
                                );
                              },
                            );
                          }
                        },
                      );
                    },
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.fromLTRB(15, 0, 15, 20),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        "Event's",
                        style: TextStyle(
                          color: themeFlag
                              ? AppColors.creamColor
                              : AppColors.mirage,
                          fontWeight: FontWeight.w500,
                          fontSize: 22,
                        ),
                      ),
                      Text(
                        "Happening, Near By Hotel's",
                        style: TextStyle(
                          color: themeFlag
                              ? AppColors.creamColor
                              : AppColors.mirage,
                          fontWeight: FontWeight.w500,
                          fontSize: 14,
                        ),
                      ),
                    ],
                  ),
                ),
                Container(
                  height: _height * 200,
                  child: Consumer<EventsNotifier>(
                    builder: (context, notifier, _) {
                      return FutureBuilder(
                        future: notifier.getAllEvents(),
                        builder:
                            (BuildContext context, AsyncSnapshot snapshot) {
                          if (snapshot.connectionState ==
                                  ConnectionState.waiting ||
                              !snapshot.hasData) {
                            return ShimmerEffects.loadShimmerEvent(
                              context: context,
                            );
                          } else {
                            List _snapshot = snapshot.data as List;
                            return ListView.builder(
                              shrinkWrap: true,
                              itemCount: snapshot.data.length,
                              scrollDirection: Axis.horizontal,
                              itemBuilder: (context, index) {
                                Event eventsModel = _snapshot[index];
                                return EventsItem(
                                  eventsModel: eventsModel,
                                  onTap: () {},
                                );
                              },
                            );
                          }
                        },
                      );
                    },
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
