import 'package:flutter/material.dart';
import 'package:hotel_booking/app/constants/app.assets.dart';
import 'package:hotel_booking/app/constants/app.colors.dart';

class NoNetworkScreen extends StatelessWidget {
  const NoNetworkScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.mirage,
      body: Center(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 50, vertical: 50),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Image.asset(
                AppAssets.wifi,
                height: 250,
                width: 250,
              ),
              Text(
                "Hey There is network issue from your side",
                style: TextStyle(
                  color: AppColors.creamColor,
                  fontSize: 18,
                ),
                textAlign: TextAlign.center,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
