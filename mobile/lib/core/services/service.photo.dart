import 'dart:convert';
import 'dart:io';
import "package:flutter/material.dart";
import 'package:hotel_booking/core/api/api.dart';
import 'package:image_picker/image_picker.dart';
import 'package:http/http.dart' as http;

class PhotoService with ChangeNotifier {
  File? _selectedImage;
  File? get selectedImage => _selectedImage;

  Future<void> pickImage() async {
    final picker = ImagePicker();
    final pickedImage = await picker.getImage(source: ImageSource.gallery);

    if (pickedImage != null) {
      _selectedImage = File(pickedImage.path);
      notifyListeners();
    }
  }

  Future<bool> updateImage(
      {required String userId, required String token}) async {
    final url = Api.BaseApi + '/users/$userId';

    final request = http.MultipartRequest('PUT', Uri.parse(url));
    request.headers['Content-Type'] = 'application/json';
    request.headers['Cookie'] = 'access_token=$token';
    request.files
        .add(await http.MultipartFile.fromPath('image', selectedImage!.path));

    final response = await request.send();

    if (response.statusCode == 200) {
      print('Image updated successfully');
      return true;
    } else {
      throw Exception(response.reasonPhrase);
    }
  }
}
