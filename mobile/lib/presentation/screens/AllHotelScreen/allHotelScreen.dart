import 'package:flutter/material.dart';
import 'package:hotel_booking/app/constants/app.colors.dart';
import 'package:hotel_booking/app/routes/app.routes.dart';
import 'package:hotel_booking/core/models/model.hotel.dart';
import 'package:hotel_booking/core/notifiers/hotel_notifier.dart';
import 'package:hotel_booking/core/notifiers/sorts_notifier.dart';
import 'package:hotel_booking/core/notifiers/theme_notifier.dart';
import 'package:hotel_booking/presentation/screens/AllHotelScreen/widgets/sort.menu.two.widget.dart';
import 'package:hotel_booking/presentation/screens/AllHotelScreen/widgets/sort.menu.widget.dart';
import 'package:hotel_booking/presentation/screens/HotelScreen/hotelScreen.dart';
import 'package:hotel_booking/presentation/screens/SearchScreen/widgets/search.items.dart';
import 'package:hotel_booking/presentation/widgets/shimmer_effects.dart';
import 'package:provider/provider.dart';
import 'package:hotel_booking/presentation/widgets/noData.dart';

class AllHotelScreen extends StatelessWidget {
  const AllHotelScreen({super.key});

  @override
  Widget build(BuildContext context) {
    ThemeNotifier _themeNotifier =
        Provider.of<ThemeNotifier>(context, listen: true);
    var themeFlag = _themeNotifier.darkTheme;
    double _height = MediaQuery.of(context).size.height / 815;
    return Scaffold(
      backgroundColor: themeFlag ? AppColors.mirage : AppColors.creamColor,
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.only(
            top: 5,
            bottom: 10,
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Padding(
                padding: const EdgeInsets.fromLTRB(15, 0, 15, 0),
                child: Text(
                  "All Hotel",
                  style: TextStyle(
                    color: themeFlag ? AppColors.creamColor : AppColors.mirage,
                    fontSize: 24,
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.fromLTRB(15, 0, 15, 10),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      "Find The Best Available Hotel",
                      style: TextStyle(
                        color:
                            themeFlag ? AppColors.creamColor : AppColors.mirage,
                        fontWeight: FontWeight.w500,
                        fontSize: 14,
                      ),
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: const [
                        SortMenuTwo(),
                        const SizedBox(
                          width: 10,
                        ),
                        SortMenuOne(),
                      ],
                    ),
                  ],
                ),
              ),
              Container(
                height: _height * 670,
                child: Consumer<HotelNotifier>(
                  builder: (context, notifier, _) {
                    return FutureBuilder(
                      future: notifier.getAllHotel(
                        roomSort:
                            Provider.of<SortNotifier>(context, listen: true)
                                .roomSort,
                        sortBy: Provider.of<SortNotifier>(context, listen: true)
                            .sortBySys,
                      ),
                      builder: (BuildContext context, AsyncSnapshot snapshot) {
                        if (snapshot.connectionState ==
                            ConnectionState.waiting) {
                          return ShimmerEffects.loadShimmerFavouriteandSearch(
                            context: context,
                            displayTrash: false,
                          );
                        } else {
                          List _snapshot = snapshot.data as List;
                          if (_snapshot.isEmpty) {
                            return noDataFound(
                              themeFlag: themeFlag,
                            );
                          } else {
                            return ListView.builder(
                              shrinkWrap: true,
                              itemCount: snapshot.data.length,
                              itemBuilder: (context, index) {
                                Hotel hotelModel = _snapshot[index];
                                return SearchItem(
                                  hotelModel: hotelModel,
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
    );
  }
}
