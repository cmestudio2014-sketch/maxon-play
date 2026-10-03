plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
}

android {
    namespace = "app.maxonplay.tv"
    compileSdk = 34
    defaultConfig {
        applicationId = "app.maxonplay.tv"
        minSdk = 23
        targetSdk = 34
        versionCode = 1
        versionName = "1.0.0"
        // Endpoint base configurável (sem barra final). Troque pela URL da Square Cloud.
        buildConfigField("String", "API_BASE_URL", "\"https://maxonplay.squareweb.app\"")
    }
    buildFeatures { buildConfig = true }
    buildTypes { release { isMinifyEnabled = true; proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt")) } }
    compileOptions { sourceCompatibility = JavaVersion.VERSION_17; targetCompatibility = JavaVersion.VERSION_17 }
    kotlinOptions { jvmTarget = "17" }
}

dependencies {
    implementation("androidx.core:core-ktx:1.13.1")
    implementation("androidx.appcompat:appcompat:1.7.0")
    implementation("androidx.leanback:leanback:1.0.0")
    implementation("androidx.security:security-crypto:1.1.0-alpha06")
    implementation("androidx.media3:media3-exoplayer:1.4.1")
    implementation("androidx.media3:media3-exoplayer-hls:1.4.1")
    implementation("androidx.media3:media3-ui:1.4.1")
    implementation("com.squareup.okhttp3:okhttp:4.12.0")
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-android:1.8.1")
}