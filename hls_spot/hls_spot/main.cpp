//
//  main.cpp
//  hls_spot
//
//  Created by gam0022 on 2013/07/12.
//  Copyright (c) 2013年 gam0022. All rights reserved.
//

#include <iostream>
#include "/usr/local/include/opencv2/opencv.hpp"
#include "/usr/local/include/opencv2/highgui/highgui.hpp"
#include <math.h>


cv::Mat get_avg_img(cv::Mat &src_img)
{
    cv::Mat m1, m2;
    cv::reduce(src_img, m1, 0, CV_REDUCE_AVG);
    cv::reduce(m1, m2, 1, CV_REDUCE_AVG);
    return m2;
}

int main(int argc, const char * argv[])
{
    std::string dir = "/Users/gam0022/git/shelf/bag_images/bag-256/";
    char format[] = "bag%03d-256.jpg";
    char filename[256];
    
    cv::Mat src_img, avg(1,1,CV_32FC3), hls(1,1,CV_32FC3);
    
    for (int i = 0; i < 100; ++i) {
        
        snprintf(filename, 256, format, i + 1); 
        src_img = cv::imread( dir + filename, 1 );
        cv::imshow( "HelloCV", src_img );
        
        avg = get_avg_img(src_img);
        
        //cv::cvtColor(avg, hls, CV_RGB2HLS);
        cv::cvtColor(avg, hls, CV_BGR2HLS);
        std::cout << hls.at<cv::Vec3b>(0,0)[0]*2 << std::endl;

    }
    
    return 0;
}
