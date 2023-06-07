import 'package:flutter/material.dart';
import 'package:hotel_booking/app/constants/app.assets.dart';
import 'package:hotel_booking/app/constants/app.colors.dart';
import 'package:hotel_booking/core/notifiers/theme_notifier.dart';
import 'package:hotel_booking/presentation/screens/AboutScreen/widgets/about.appbar.dart';
import 'package:hotel_booking/presentation/widgets/custom_styles.dart';
import 'package:provider/provider.dart';

class AboutScreen extends StatelessWidget {
  const AboutScreen({super.key});

  @override
  Widget build(BuildContext context) {
    ThemeNotifier _themeNotifier =
        Provider.of<ThemeNotifier>(context, listen: true);
    var themeFlag = _themeNotifier.darkTheme;
    var mediaQueryHeight = MediaQuery.of(context).size.height;
    return Scaffold(
      appBar: aboutAppBar(
        themeFlag: themeFlag,
      ),
      backgroundColor: themeFlag ? AppColors.mirage : AppColors.creamColor,
      body: Column(
        children: [
          SizedBox(
            height: mediaQueryHeight / 8,
          ),
          Center(
            child: Image.asset(
              AppAssets.logo,
              height: 140,
              width: 140,
            ),
          ),
          SizedBox(
            height: mediaQueryHeight / 20,
          ),
          Text(
            'Hotel Booking',
            textAlign: TextAlign.left,
            style: kBodyText.copyWith(
              fontSize: 25,
              color: themeFlag ? AppColors.creamColor : AppColors.mirage,
            ),
          ),
          SizedBox(
            height: mediaQueryHeight / 50,
          ),
          Text(
            'Package Name: com.dev.hotelbooking.HDV',
            textAlign: TextAlign.left,
            style: kBodyText.copyWith(
              fontSize: 16,
              color: themeFlag ? AppColors.creamColor : AppColors.mirage,
            ),
          ),
          Text(
            'Version: 1.0.0',
            textAlign: TextAlign.left,
            style: kBodyText.copyWith(
              fontSize: 16,
              color: themeFlag ? AppColors.creamColor : AppColors.mirage,
            ),
          ),
          SizedBox(
            height: mediaQueryHeight / 40,
          ),
          Text(
            'For Any Question, \n Contact: tuankiet270101@gmail.com',
            textAlign: TextAlign.center,
            style: kBodyText.copyWith(
              fontSize: 16,
              color: themeFlag ? AppColors.creamColor : AppColors.mirage,
            ),
          ),
        ],
      ),
    );
  }
}
