import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:hotel_booking/app/constants/app.colors.dart';
import 'package:hotel_booking/core/models/model.hotel.dart';

class FeatureHotel extends StatelessWidget {
  final Hotel hotelModel;
  final GestureTapCallback? onTapFavorite;
  final GestureTapCallback? onTap;
  const FeatureHotel({
    super.key,
    required this.hotelModel,
    this.onTapFavorite,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    double _height = MediaQuery.of(context).size.height / 815;
    return GestureDetector(
      onTap: onTap,
      child: Container(
        height: _height * 280,
        width: 220,
        padding: const EdgeInsets.fromLTRB(15, 0, 15, 10),
        child: ClipRRect(
          borderRadius: BorderRadius.circular(30),
          child: Stack(
            children: [
              CachedNetworkImage(
                imageUrl: hotelModel.photos![0],
                imageBuilder: (context, imageProvider) => Container(
                  height: _height * 280,
                  width: 220,
                  decoration: BoxDecoration(
                    image: DecorationImage(
                      image: imageProvider,
                      fit: BoxFit.cover,
                    ),
                  ),
                ),
                errorWidget: (context, url, error) => Icon(Icons.error),
              ),
              Container(
                height: _height * 280,
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
                left: 15,
                top: 210,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      hotelModel.name!,
                      overflow: TextOverflow.ellipsis,
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: _height * 14,
                      ),
                    ),
                    Container(
                      height: 25,
                      width: 150,
                      child: Text(
                        hotelModel.address!,
                        overflow: TextOverflow.ellipsis,
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: _height * 14,
                        ),
                      ),
                    ),
                    Text(
                      '${hotelModel.cheapestPrice} Cheapest Price',
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: TextStyle(
                        color: AppColors.yellowish,
                        fontSize: _height * 12,
                      ),
                    ),
                  ],
                ),
              ),
              Positioned(
                left: 140,
                top: 3,
                child: IconButton(
                  icon: Icon(
                    Icons.favorite_outline_rounded,
                    size: _height * 25,
                    color: Colors.white,
                    shadows: const [
                      BoxShadow(
                        color: Colors.black,
                        offset: Offset(
                          0.0,
                          0.0,
                        ),
                        blurRadius: 10,
                        spreadRadius: 4,
                      ),
                    ],
                  ),
                  onPressed: onTapFavorite,
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
