import 'package:flutter/material.dart';
import 'package:hotel_booking/app/constants/app.colors.dart';
import 'package:hotel_booking/app/routes/app.routes.dart';
import 'package:hotel_booking/core/models/model.hotel.dart';
import 'package:hotel_booking/core/notifiers/hotel_notifier.dart';
import 'package:hotel_booking/core/notifiers/theme_notifier.dart';
import 'package:hotel_booking/presentation/screens/HotelScreen/hotelScreen.dart';
import 'package:hotel_booking/presentation/screens/SearchScreen/widgets/search.items.dart';
import 'package:hotel_booking/presentation/widgets/custom_styles.dart';
import 'package:hotel_booking/presentation/widgets/custom_textfield.dart';
import 'package:hotel_booking/presentation/widgets/noData.dart';
import 'package:hotel_booking/presentation/widgets/shimmer_effects.dart';
import 'package:provider/provider.dart';

class SearchScreen extends StatefulWidget {
  const SearchScreen({super.key});

  @override
  State<SearchScreen> createState() => _SearchScreenState();
}

class _SearchScreenState extends State<SearchScreen> {
  final TextEditingController searchProductController = TextEditingController();
  bool isExecuted = false;

  @override
  Widget build(BuildContext context) {
    ThemeNotifier _themeNotifier = Provider.of<ThemeNotifier>(context);
    var themeFlag = _themeNotifier.darkTheme;
    double _height = MediaQuery.of(context).size.height / 815;

    return Scaffold(
      backgroundColor: themeFlag ? AppColors.mirage : AppColors.creamColor,
      body: SafeArea(
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Padding(
                padding: const EdgeInsets.symmetric(
                  horizontal: 20,
                  vertical: 10,
                ),
                child: Card(
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(10),
                    side: BorderSide(
                      color: AppColors.rawSienna,
                      width: 1,
                    ),
                  ),
                  elevation: 6,
                  color: themeFlag ? AppColors.mirage : AppColors.creamColor,
                  child: CustomTextField.customTextField2(
                      hintText: 'Search',
                      inputType: TextInputType.text,
                      textEditingController: searchProductController,
                      validator: (val) =>
                          val!.isEmpty ? 'Enter a Search' : null,
                      themeFlag: themeFlag,
                      onChanged: (val) {
                        setState(() {
                          isExecuted = true;
                        });
                      }),
                ),
              ),
              isExecuted
                  ? searchData(
                      searchContent: searchProductController.text,
                      themeFlag: themeFlag,
                    )
                  : Column(
                      children: [
                        SizedBox(
                          height: _height * 290,
                        ),
                        Center(
                          child: Text(
                            "Search Your Room",
                            style: kBodyText.copyWith(
                              fontSize: _height * 20,
                              fontWeight: FontWeight.bold,
                              color: themeFlag
                                  ? AppColors.creamColor
                                  : AppColors.mirage,
                            ),
                          ),
                        ),
                      ],
                    )
            ],
          ),
        ),
      ),
    );
  }

  Widget searchData({required searchContent, required bool themeFlag}) {
    return Column(
      children: [
        SizedBox(
          height: MediaQuery.of(context).size.height * 0.75,
          width: MediaQuery.of(context).size.width,
          child: Consumer<HotelNotifier>(
            builder: (context, notifier, _) {
              return FutureBuilder(
                future: notifier.getSearchHotel(
                  hotelName: searchProductController.text.replaceAll(' ', ''),
                ),
                builder: (BuildContext context, AsyncSnapshot snapshot) {
                  if (snapshot.connectionState == ConnectionState.waiting) {
                    return ShimmerEffects.loadShimmerFavouriteandSearch(
                        context: context, displayTrash: false);
                  } else {
                    List _snapshot = snapshot.data as List;
                    print(searchProductController.text.replaceAll(' ', ''));
                    if (_snapshot.length == 0 || _snapshot.isEmpty) {
                      return noDataFound(themeFlag: themeFlag);
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
                                arguments:
                                    HotelScreenArgs(hotel_id: hotelModel.id),
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
        )
      ],
    );
  }
}
