import 'package:dropdown_button2/dropdown_button2.dart';
import 'package:flutter/material.dart';
import 'package:hotel_booking/app/constants/app.colors.dart';
import 'package:hotel_booking/core/notifiers/sorts_notifier.dart';
import 'package:hotel_booking/core/notifiers/theme_notifier.dart';
import 'package:provider/provider.dart';

class SortMenuOne extends StatefulWidget {
  const SortMenuOne({super.key});

  @override
  State<SortMenuOne> createState() => _SortMenuOneState();
}

class _SortMenuOneState extends State<SortMenuOne> {
  @override
  Widget build(BuildContext context) {
    ThemeNotifier _themeNotifier =
        Provider.of<ThemeNotifier>(context, listen: true);
    var themeFlag = _themeNotifier.darkTheme;
    return DropdownButtonHideUnderline(
      child: DropdownButton2(
        customButton: Icon(
          Icons.sort_sharp,
          size: 35,
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
          padding: EdgeInsets.symmetric(
            vertical: 6,
          ),
        ),
        dropdownStyleData: DropdownStyleData(
          width: 160,
          padding: const EdgeInsets.symmetric(
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
  final String text;
  final IconData icon;

  const MenuItem({
    required this.text,
    required this.icon,
  });
}

class MenuItems {
  static const List<MenuItem> firstItems = [up, down];
  static const down = MenuItem(text: 'High to Low', icon: Icons.sort_by_alpha);
  static const up =
      MenuItem(text: 'Low to High', icon: Icons.move_down_outlined);
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
          item.text,
          style: const TextStyle(
            color: Colors.white,
          ),
        )
      ],
    );
  }

  static onChanged(BuildContext context, MenuItem item) {
    switch (item) {
      case MenuItems.up:
        Provider.of<SortNotifier>(context, listen: false)
            .changeByAscendingOrder();
        break;
      case MenuItems.down:
        Provider.of<SortNotifier>(context, listen: false)
            .changeByDescendingOrder();
        break;
    }
  }
}
