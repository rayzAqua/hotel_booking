import 'package:flutter/material.dart';
import 'package:hotel_booking/core/models/model.user.dart';
import 'package:hotel_booking/core/notifiers/theme_notifier.dart';
import 'package:hotel_booking/presentation/screens/FavouriteScreen/favoriteScreen.dart';
import 'package:hotel_booking/presentation/screens/HomeScreen/homeScreen.dart';
import 'package:hotel_booking/presentation/screens/SearchScreen/searchScreen.dart';
import 'package:hotel_booking/presentation/screens/SettingScreen/settingScreen.dart';
import 'package:hotel_booking/presentation/screens/NavigationScreen/widgets/nav.bottomNav.dart';
import 'package:provider/provider.dart';

class NavigationScreen extends StatefulWidget {
  const NavigationScreen({super.key});

  @override
  State<NavigationScreen> createState() => _NavigationScreenState();
}

class _NavigationScreenState extends State<NavigationScreen> {
  int pageIndex = 0;
  final PageController homePageController = PageController();

  @override
  Widget build(BuildContext context) {
    ThemeNotifier _themeNotifier = Provider.of<ThemeNotifier>(context);
    var themeFlag = _themeNotifier.darkTheme;
    return Scaffold(
      body: PageView(
        controller: homePageController,
        physics: const NeverScrollableScrollPhysics(),
        onPageChanged: (page) {
          setState(() {
            pageIndex = page;
          });
        },
        children: [
          HomeScreen(),
          SearchScreen(),
          FavoriteScreen(),
          SettingScreen(),
        ],
      ),
      bottomNavigationBar: BottomNav(
        controller: homePageController,
        index: pageIndex,
        themeFlag: themeFlag,
      ),
    );
  }
}