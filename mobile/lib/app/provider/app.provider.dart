import 'package:hotel_booking/core/notifiers/authentication_notifier.dart';
import 'package:hotel_booking/core/notifiers/booking_notifier.dart';
import 'package:hotel_booking/core/notifiers/favourite_notifier.dart';
import 'package:hotel_booking/core/notifiers/hotel_notifier.dart';
import 'package:hotel_booking/core/notifiers/password_notifier.dart';
import 'package:hotel_booking/core/notifiers/sorts_notifier.dart';
import 'package:hotel_booking/core/notifiers/theme_notifier.dart';
import 'package:hotel_booking/core/services/service.photo.dart';
import 'package:provider/provider.dart';
import 'package:provider/single_child_widget.dart';

class AppProvider {
  static List<SingleChildWidget> providers = [
    ChangeNotifierProvider(create: (_) => HotelNotifier()),
    ChangeNotifierProvider(create: (_) => PasswordNotifier()),
    ChangeNotifierProvider(create: (_) => SortNotifier()),
    ChangeNotifierProvider(create: (_) => ThemeNotifier()),
    ChangeNotifierProvider(create: (_) => AuthenticationNotifier()),
    ChangeNotifierProvider(create: (_) => PhotoService()),
    ChangeNotifierProvider(create: (_) => BookingNotifier()),
    ChangeNotifierProvider(create: (_) => FavouriteNotifier()),
  ];
}
