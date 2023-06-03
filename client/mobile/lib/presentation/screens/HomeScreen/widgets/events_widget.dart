import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';

class EventsItem extends StatelessWidget {
  EventsItem({super.key, this.onTap});

  final GestureTapCallback? onTap;

  @override
  Widget build(BuildContext context) {
    double _height = MediaQuery.of(context).size.height / 815;
    double _width = MediaQuery.of(context).size.width / 375;
    return GestureDetector(
      onTap: onTap,
      child: Container(
        height: _height * 205,
        width: _width * 375,
        padding: const EdgeInsets.fromLTRB(15, 0, 15, 10),
        child: ClipRRect(
          borderRadius: BorderRadius.circular(30),
          child: Stack(
            children: [
              Container(
                height: _height * 205,
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    stops: [0.5, 0.8],
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                    colors: [
                      Colors.transparent,
                      Colors.black.withOpacity(0.6),
                    ],
                  ),
                ),
              ),
              Positioned(
                left: 10,
                top: 115,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      "Test"
                    )
                  ],
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}