import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:hotel_booking/app/constants/app.colors.dart';
import 'package:hotel_booking/core/models/model.favourite.dart';

class FavoriteItem extends StatelessWidget {
  final GestureTapCallback? onTap;
  final GestureTapCallback? onDelete;
  final Favourite? favouriteModel;
  FavoriteItem({super.key, this.onTap, this.onDelete, this.favouriteModel});

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
              CachedNetworkImage(
                imageUrl: favouriteModel!.photos![0],
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
                    stops: [0.0, 0.9],
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                    colors: [
                      Colors.transparent,
                      Colors.black.withOpacity(0.9),
                    ],
                  ),
                ),
              ),
              Positioned(
                left: 310,
                top: 2,
                child: IconButton(
                  icon: Icon(
                    Icons.delete,
                    size: _height * 22,
                    color: Colors.white,
                    shadows: const [
                      BoxShadow(
                        color: Colors.black,
                        offset: Offset(0.0, 0.0),
                        blurRadius: 20,
                        spreadRadius: 4,
                      )
                    ],
                  ),
                  onPressed: onDelete,
                ),
              ),
              Positioned(
                left: 20,
                top: 90,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      '${favouriteModel!.name}',
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                        fontSize: _height * 14,
                      ),
                    ),
                    Text(
                      '${favouriteModel!.title}',
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                        fontSize: _height * 12,
                      ),
                    ),
                    Text(
                      '${favouriteModel!.address}',
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
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
                          '${favouriteModel!.rating}',
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                          style: TextStyle(
                            fontWeight: FontWeight.bold,
                            color: Colors.white,
                            fontSize: _height * 12,
                          ),
                        ),
                      ],
                    ),
                    Text(
                      '\$${favouriteModel!.cheapestPrice.toString()}/room',
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        color: AppColors.yellowish,
                        fontSize: _height * 12,
                      ),
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
