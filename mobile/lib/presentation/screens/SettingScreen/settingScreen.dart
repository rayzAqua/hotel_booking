import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:hotel_booking/app/constants/app.colors.dart';
import 'package:hotel_booking/app/routes/app.routes.dart';
import 'package:hotel_booking/core/notifiers/authentication_notifier.dart';
import 'package:hotel_booking/core/notifiers/theme_notifier.dart';
import 'package:hotel_booking/presentation/screens/ProfileScreen/profileScreen.dart';
import 'package:hotel_booking/presentation/screens/SettingScreen/widgets/iconStyle.dart';
import 'package:hotel_booking/presentation/screens/SettingScreen/widgets/setting.appbar.dart';
import 'package:hotel_booking/presentation/screens/SettingScreen/widgets/setting.item.dart';
import 'package:hotel_booking/presentation/screens/SettingScreen/widgets/setting.user.card.dart';
import 'package:provider/provider.dart';

class SettingScreen extends StatelessWidget {
  SettingScreen({super.key});

  @override
  Widget build(BuildContext context) {
    var auth = Provider.of<AuthenticationNotifier>(context, listen: true);
    Provider.of<AuthenticationNotifier>(context, listen: true).getUserData();
    ThemeNotifier _themeNotifier =
        Provider.of<ThemeNotifier>(context, listen: true);
    var themeFlag = _themeNotifier.darkTheme;
    return Scaffold(
      appBar: settingAppBar(themeFlag: themeFlag),
      backgroundColor: themeFlag ? AppColors.mirage : AppColors.creamColor,
      body: SingleChildScrollView(
        child: Column(
          children: [
            const SizedBox(
              height: 10,
            ),
            UserCard(
              cardColor: AppColors.rawSienna,
              userName: auth.username,
              userProfileUrl: auth.userPhoto!,
              onTap: () {},
            ),
            const SizedBox(
              height: 10,
            ),
            SettingItem(
              onTap: () {},
              icons: Icons.dark_mode_rounded,
              iconStyle: IconStyle(
                iconsColor: Colors.white,
                withBackground: true,
                backgroundColor: AppColors.yellowish,
              ),
              title: 'Dark mode',
              subtitle: 'Change App Theme',
              trailing: Switch.adaptive(
                value: _themeNotifier.darkTheme,
                onChanged: (value) {
                  _themeNotifier.darkTheme = !value;
                  _themeNotifier.toggleTheme();
                },
              ),
              themeFlag: themeFlag,
            ),
            SettingItem(
              themeFlag: themeFlag,
              onTap: () {
                Navigator.of(context).pushNamed(
                  AppRouter.profileRoute,
                  arguments: ProfileTaskArgs(
                    user_name: auth.username!,
                    user_email: auth.userEmail!,
                    user_phoneNo: auth.userPhone!,
                    user_image: auth.userPhoto!,
                  ),
                );
              },
              icons: CupertinoIcons.profile_circled,
              iconStyle: IconStyle(),
              title: 'Profile',
              subtitle: 'Modify Your Data',
            ),
            SettingItem(
              themeFlag: themeFlag,
              onTap: () {
                Navigator.of(context).pushNamed(AppRouter.prevBookingRoute);
              },
              icons: CupertinoIcons.bookmark_fill,
              iconStyle: IconStyle(
                backgroundColor: Colors.brown,
              ),
              title: 'Booking',
              subtitle: 'Check Old Bookings',
            ),
            SettingItem(
              themeFlag: themeFlag,
              onTap: () {
                Navigator.of(context).pushNamed(AppRouter.aboutRoute);
              },
              icons: Icons.info_rounded,
              iconStyle: IconStyle(
                backgroundColor: Colors.purple,
              ),
              title: 'About',
              subtitle: "Learn more about HotelBooking App",
            ),
            SettingItem(
              themeFlag: themeFlag,
              onTap: () {
                Navigator.of(context).pushNamed(AppRouter.feedbackRoute);
              },
              icons: Icons.chat_bubble,
              iconStyle: IconStyle(
                backgroundColor: Colors.deepOrangeAccent,
              ),
              title: 'Send Feedback',
              subtitle: "We Listen To Our Customer",
            ),
            SettingItem(
              themeFlag: themeFlag,
              onTap: () {
                showAlertDialog(context: context, themeFlag: themeFlag);
              },
              icons: Icons.logout,
              iconStyle: IconStyle(
                backgroundColor: Colors.red,
              ),
              title: 'See You Later',
              subtitle: "Sign Out",
            ),
          ],
        ),
      ),
    );
  }

  showAlertDialog({
    required BuildContext context,
    required bool themeFlag,
  }) {
    Widget cancelButton = TextButton(
      child: const Text(
        'No',
        style: TextStyle(
          fontSize: 16,
          fontWeight: FontWeight.w500,
          color: Colors.blueAccent,
        ),
      ),
      onPressed: () {
        Navigator.of(context).pop();
      },
    );
    Widget continueButton = TextButton(
      child: const Text(
        'Yes',
        style: TextStyle(
          fontSize: 16,
          fontWeight: FontWeight.w500,
          color: Colors.blueAccent,
        ),
      ),
      onPressed: () {
        Navigator.of(context).pushReplacementNamed(AppRouter.loginRoute);
      },
    );
    AlertDialog alert = AlertDialog(
      title: Text(
        'Are You Sure You Want To Logout?',
        style: TextStyle(
          color: themeFlag ? AppColors.creamColor : AppColors.mirage,
          fontSize: 18,
        ),
      ),
      content: Text(
        'You Will Regret About It!',
        style: TextStyle(
          color: themeFlag ? AppColors.mirage : AppColors.creamColor,
        ),
      ),
      backgroundColor: themeFlag ? AppColors.mirage : AppColors.creamColor,
      actions: [
        cancelButton,
        continueButton,
      ],
    );

    showDialog(
      context: context,
      builder: (BuildContext context) {
        return alert;
      },
    );
  }
}
