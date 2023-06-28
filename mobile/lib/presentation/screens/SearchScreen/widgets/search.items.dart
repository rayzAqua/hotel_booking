import 'package:cached_network_image/cached_network_image.dart';
import "package:flutter/material.dart";
import 'package:hotel_booking/app/constants/app.colors.dart';
import 'package:hotel_booking/core/models/model.hotel.dart';

class SearchItem extends StatelessWidget {
  final GestureTapCallback? onTap;
  final Hotel hotelModel;
  SearchItem({super.key, this.onTap, required this.hotelModel});

  @override
  Widget build(BuildContext context) {
    double _height = MediaQuery.of(context).size.height / 815;
    double _width = MediaQuery.of(context).size.width / 375;
    return GestureDetector(
      onTap: onTap,
      child: Container(
        height: _height * 205,
        width: _width * 375,
        padding: const EdgeInsets.symmetric(
          horizontal: 25,
          vertical: 7,
        ),
        child: ClipRRect(
          borderRadius: BorderRadius.circular(30),
          child: Stack(
            children: [
              CachedNetworkImage(
                imageUrl: hotelModel.photos![0],
                imageBuilder: (context, imageProvider) => Container(
                  height: _height * 205,
                  width: _width * 375,
                  decoration: BoxDecoration(
                    image: DecorationImage(
                      image: imageProvider,
                      fit: BoxFit.cover,
                    ),
                  ),
                ),
                placeholder: (context, url) => CircularProgressIndicator(),
                errorWidget: (context, url, error) => Icon(Icons.error),
              ),
              Container(
                height: _height * 205,
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    stops: [0.2, 0.9],
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
                left: 20,
                top: 90,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      hotelModel.name!,
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: TextStyle(
                        // color: Colors.black,
                        color: Colors.white,
                        fontSize: _height * 14,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    Text(
                      hotelModel.title!,
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: TextStyle(
                        color: Colors.white,
                        // color: Colors.black,
                        fontWeight: FontWeight.bold,
                        fontSize: _height * 12,
                      ),
                    ),
                    Text(
                      hotelModel.address!,
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: TextStyle(
                        // color: Colors.black,
                        color: Colors.white,
                        fontWeight: FontWeight.bold,
                        fontSize: _height * 12,
                      ),
                    ),
                    Row(
                      children: [
                        Icon(
                          Icons.star,
                          color: AppColors.yellowish,
                          size: _height * 12,
                        ),
                        const SizedBox(
                          width: 5,
                        ),
                        Text(
                          hotelModel.rating!.toString(),
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                          style: TextStyle(
                            color: Colors.white,
                            // color: Colors.black,
                            fontWeight: FontWeight.bold,
                            fontSize: _height * 12,
                          ),
                        ),
                      ],
                    ),
                    Text(
                      "Only ${hotelModel.cheapestPrice.toString()}0000vnđ/room",
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: TextStyle(
                        color: AppColors.yellowish,
                        fontWeight: FontWeight.bold,
                        fontSize: _height * 12,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
