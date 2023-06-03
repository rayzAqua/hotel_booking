import 'package:flutter/material.dart';
import 'package:hotel_booking/app/constants/app.colors.dart';
import 'package:hotel_booking/app/routes/app.routes.dart';
import 'package:hotel_booking/core/models/model.favourite.dart';
import 'package:hotel_booking/core/notifiers/authentication_notifier.dart';
import 'package:hotel_booking/core/notifiers/favourite_notifier.dart';
import 'package:hotel_booking/core/notifiers/theme_notifier.dart';
import 'package:hotel_booking/presentation/screens/FavouriteScreen/widgets/favorite.item.widget.dart';
import 'package:hotel_booking/presentation/screens/HotelScreen/hotelScreen.dart';
import 'package:hotel_booking/presentation/widgets/custom_snackbar.dart';
import 'package:hotel_booking/presentation/widgets/noData.dart';
import 'package:hotel_booking/presentation/widgets/shimmer_effects.dart';
import 'package:provider/provider.dart';

class FavoriteScreen extends StatelessWidget {
  const FavoriteScreen({super.key});

  @override
  Widget build(BuildContext context) {
    ThemeNotifier _themeNotifier =
        Provider.of<ThemeNotifier>(context, listen: true);
    var themeFlag = _themeNotifier.darkTheme;
    AuthenticationNotifier _auth =
        Provider.of<AuthenticationNotifier>(context, listen: true);
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
                padding: const EdgeInsets.fromLTRB(15, 0, 15, 10),
                child: Text(
                  'Favorite',
                  style: TextStyle(
                    color: themeFlag ? AppColors.creamColor : AppColors.mirage,
                    fontWeight: FontWeight.w600,
                    fontSize: 22,
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.fromLTRB(15, 0, 15, 10),
                child: Text(
                  "Your Favorite Room's",
                  style: TextStyle(
                    color: themeFlag ? AppColors.creamColor : AppColors.mirage,
                    fontWeight: FontWeight.w500,
                    fontSize: 22,
                  ),
                ),
              ),
              Container(
                height: _height * 620,
                child: Consumer<FavouriteNotifier>(
                  builder: (context, notifier, _) {
                    return FutureBuilder(
                      future: notifier.getAllFavourite(
                        userId: _auth.userId!,
                        token: _auth.token!,
                      ),
                      builder: (BuildContext context, AsyncSnapshot snapshot) {
                        if (snapshot.connectionState ==
                            ConnectionState.waiting) {
                          return ShimmerEffects.loadShimmerFavouriteandSearch(
                            context: context,
                            displayTrash: true,
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
                                Favourite favouriteModel = _snapshot[index];
                                return FavoriteItem(
                                  favouriteModel: favouriteModel,
                                  onDelete: () async {
                                    bool isDeleted =
                                        await notifier.deleteFromFavourite(
                                      userId: _auth.userId!,
                                      token: _auth.token!,
                                      hotelId: favouriteModel.sId!,
                                    );
                                    if (isDeleted) {
                                      SnackUtil.showSnackBar(
                                        context: context,
                                        text: "Deleted Successfully",
                                        textColor: AppColors.creamColor,
                                        backgroundColor: Colors.green,
                                      );
                                    } else {
                                      SnackUtil.showSnackBar(
                                        context: context,
                                        text: "Oops Some Error Occured",
                                        textColor: AppColors.creamColor,
                                        backgroundColor: Colors.red,
                                      );
                                    }
                                  },
                                  onTap: () {
                                    Navigator.of(context).pushNamed(
                                      AppRouter.hotelDetailRoute,
                                      arguments: HotelScreenArgs(
                                        hotel_id: favouriteModel.sId,
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
