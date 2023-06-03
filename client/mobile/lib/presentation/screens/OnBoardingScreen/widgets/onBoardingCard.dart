import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:hotel_booking/core/models/model.onBoarding.dart';

class PageCard extends StatelessWidget {
  final OnBoardingModel card;
  const PageCard({super.key, required this.card});

  @override
  Widget build(BuildContext context) {
    final height = MediaQuery.of(context).size.height;
    space(double p) => SizedBox(height: height * p / 100);
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 30),
      child: Column(
        children: [
          space(1),
          _buildPicture(context),
          space(2),
          _buildText(context),
        ],
      ),
    );
  }

  Widget _buildPicture(
    BuildContext context, {
    double size = 300,
  }) {
    return Container(
      width: size,
      height: size,
      margin: const EdgeInsets.only(top: 140),
      child: SvgPicture.asset(card.image!),
    );
  }

  Widget _buildText(BuildContext context) {
    return Text(
      card.title!,
      textAlign: TextAlign.center,
      style: TextStyle(
        color: card.textColor,
        fontWeight: FontWeight.w600,
        fontSize: 24,
        letterSpacing: 0,
      ),
    );
  }
}
