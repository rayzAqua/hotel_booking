import 'package:flutter/material.dart';
import 'package:hotel_booking/app/constants/app.colors.dart';
import 'package:hotel_booking/presentation/screens/SettingScreen/widgets/iconStyle.dart';

class SettingItem extends StatelessWidget {
  final IconData icons;
  final IconStyle? iconStyle;
  final String title;
  final String? subtitle;
  final Widget? trailing;
  final double? size;
  final bool themeFlag;
  final VoidCallback onTap;
  SettingItem({
    super.key,
    required this.icons,
    this.iconStyle,
    required this.title,
    this.subtitle = "",
    this.trailing,
    this.size,
    required this.themeFlag,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return ListTile(
      onTap: onTap,
      leading: (iconStyle != null && iconStyle!.withBackground!)
          ? Container(
              decoration: BoxDecoration(
                color: iconStyle!.backgroundColor,
                borderRadius: BorderRadius.circular(iconStyle!.borderRadius!),
              ),
              padding: EdgeInsets.all(5),
              child: Icon(
                icons,
                size: size,
                color: iconStyle!.iconsColor,
              ),
            )
          : Icon(
              icons,
              size: size,
            ),
      title: Text(
        title,
        style: TextStyle(
          fontWeight: FontWeight.bold,
          color: themeFlag ? AppColors.creamColor : AppColors.mirage,
        ),
        maxLines: 1,
      ),
      subtitle: Text(
        subtitle!,
        style: TextStyle(
          color: AppColors.rawSienna,
        ),
        maxLines: 1,
      ),
      trailing:
          (trailing != null) ? trailing : Icon(Icons.arrow_forward_ios_rounded),
    );
  }
}
