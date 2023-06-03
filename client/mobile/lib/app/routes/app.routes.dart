import 'package:flutter/material.dart';
import 'package:hotel_booking/presentation/screens/AboutScreen/aboutScreen.dart';
import 'package:hotel_booking/presentation/screens/AllHotelScreen/allHotelScreen.dart';
import 'package:hotel_booking/presentation/screens/BookingScreen/bookingScreen.dart';
import 'package:hotel_booking/presentation/screens/FeedbackScreen/feedbackScreen.dart';
import 'package:hotel_booking/presentation/screens/HotelScreen/hotelScreen.dart';
import 'package:hotel_booking/presentation/screens/LoginScreen/loginScreen.dart';
import 'package:hotel_booking/presentation/screens/NavigationScreen/navigationScreen.dart';
import 'package:hotel_booking/presentation/screens/NoNetworkScreen/noNetworkScreen.dart';
import 'package:hotel_booking/presentation/screens/PrevBookingScreen/prevBookingScreen.dart';
import 'package:hotel_booking/presentation/screens/ProfileScreen/profileScreen.dart';
import 'package:hotel_booking/presentation/screens/SignupScreen/signupScreen.dart';
import 'package:hotel_booking/presentation/screens/SplashScreen/splashScreen.dart';

class AppRouter {
  static const String loginRoute = "/login";
  static const String signupRoute = "/signup";
  static const String splashRoute = "/splash";
  static const String noNetworkRoute = "/noNet";
  static const String hotelDetailRoute = "/hotel";
  static const String allHotelRoute = "/allHotel";
  static const String navRoute = "/nav";
  static const String aboutRoute = "/about";
  static const String prevBookingRoute = "/prevBooking";
  static const String feedbackRoute = "/feedback";
  static const String bookingRoute = "/bookingF";
  static const String profileRoute = "/profile";

  static Route? generateRoute(RouteSettings settings) {
    switch (settings.name) {
      case splashRoute:
        {
          return MaterialPageRoute(
            builder: (_) => SplashScreen(),
          );
        }
      case loginRoute:
        {
          return MaterialPageRoute(
            builder: (_) => LoginScreen(),
          );
        }
      case signupRoute:
        {
          return MaterialPageRoute(
            builder: (_) => SignUpScreen(),
          );
        }
      case noNetworkRoute:
        {
          return MaterialPageRoute(
            builder: (context) => NoNetworkScreen(),
          );
        }
      case hotelDetailRoute:
        {
          return MaterialPageRoute(
            builder: (context) => HotelScreen(
                hotelScreenArgs: ModalRoute.of(context)!.settings.arguments
                    as HotelScreenArgs),
            settings: settings,
          );
        }
      case allHotelRoute:
        {
          return MaterialPageRoute(
            builder: (context) => AllHotelScreen(),
          );
        }
      case navRoute:
        {
          return MaterialPageRoute(
            builder: (context) => NavigationScreen(),
          );
        }
      case aboutRoute:
        {
          return MaterialPageRoute(
            builder: (context) => AboutScreen(),
          );
        }
      case prevBookingRoute:
        {
          return MaterialPageRoute(
            builder: (context) => PreviousBookingScreen(),
          );
        }
      case feedbackRoute:
        {
          return MaterialPageRoute(
            builder: (context) => FeedbackScreen(),
          );
        }
      case bookingRoute:
        {
          return MaterialPageRoute(
            builder: (context) => BookingScreen(
              bookingScreenArgs: ModalRoute.of(context)!.settings.arguments
                  as BookingScreenArgs,
            ),
            settings: settings,
          );
        }
      case profileRoute:
        {
          return MaterialPageRoute(
              builder: (context) => ProfileScreen(
                    profileTaskArgs: ModalRoute.of(context)!.settings.arguments
                        as ProfileTaskArgs,
                  ),
              settings: settings);
        }
    }
    return null;
  }
}
