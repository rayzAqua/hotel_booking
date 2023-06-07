import 'package:dropdown_button2/dropdown_button2.dart';
import 'package:flutter/material.dart';
import 'package:hotel_booking/app/constants/app.colors.dart';
import 'package:hotel_booking/core/notifiers/sorts_notifier.dart';
import 'package:hotel_booking/core/notifiers/theme_notifier.dart';
import 'package:provider/provider.dart';

class SortMenuTwo extends StatefulWidget {
  const SortMenuTwo({super.key});

  @override
  State<SortMenuTwo> createState() => _SortMenuTwoState();
}

class _SortMenuTwoState extends State<SortMenuTwo> {
  @override
  Widget build(BuildContext context) {
    ThemeNotifier _themeNotifier =
        Provider.of<ThemeNotifier>(context, listen: true);
    var themeFlag = _themeNotifier.darkTheme;
    return DropdownButtonHideUnderline(
      child: DropdownButton2(
        customButton: Icon(
          Icons.settings,
          size: 30,
          color: themeFlag ? AppColors.creamColor : AppColors.mirage,
        ),
        items: [
          ...MenuItems.firstItems.map(
            (item) => DropdownMenuItem<MenuItem>(
              value: item,
              child: MenuItems.buildItem(item),
            ),
          ),
        ],
        onChanged: (value) {
          MenuItems.onChanged(context, value as MenuItem);
        },
        menuItemStyleData: const MenuItemStyleData(
          height: 48,
          padding: EdgeInsets.only(
            left: 16,
            right: 16,
          ),
        ),
        dropdownStyleData: DropdownStyleData(
          maxHeight: 250,
          width: 160,
          padding: EdgeInsets.symmetric(
            vertical: 6,
          ),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(4),
            color: AppColors.mirage,
          ),
          elevation: 8,
          offset: const Offset(0, 8),
        ),
      ),
    );
  }
}

class MenuItem {
  final String? text;
  final IconData? icon;
  const MenuItem({
    this.text,
    this.icon,
  });
}

class MenuItems {
  static const List<MenuItem> firstItems = [normal, rating, price];
  static const normal =
      MenuItem(text: 'Default', icon: Icons.arrow_back_ios_new);
  static const rating = MenuItem(text: 'Rating', icon: Icons.rate_review);
  static const price = MenuItem(text: 'Price', icon: Icons.price_change);

  static Widget buildItem(MenuItem item) {
    return Row(
      children: [
        Icon(
          item.icon,
          color: Colors.white,
          size: 22,
        ),
        const SizedBox(
          width: 10,
        ),
        Text(
          item.text!,
          style: const TextStyle(
            color: Colors.white,
          ),
        )
      ],
    );
  }

  static onChanged(BuildContext context, MenuItem item) {
    switch (item) {
      case MenuItems.normal:
        Provider.of<SortNotifier>(context, listen: false).changeNormal();
        break;
      case MenuItems.rating:
        Provider.of<SortNotifier>(context, listen: false).changeByRating();
        break;
      case MenuItems.price:
        Provider.of<SortNotifier>(context, listen: false).changeByPrice();
        break;
    }
  }
}
