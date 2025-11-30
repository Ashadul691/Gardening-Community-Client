import { BookOpen, Calendar, Heart, MapPin, Plus, Star, TrendingUp, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import slider1 from '../assets/slider1.jpg';
import slider2 from '../assets/slider2.jpg';
import slider3 from '../assets/slider3.jpg';



const Home = () => {
  const [trendingTips, setTrendingTips] = useState([]);
  const [featuredGardeners, setFeaturedGardeners] = useState([]);

  useEffect(() => {
    
    fetch('https://gardening-community-server-five.vercel.app/tips/trending?limit=6')
      .then(res => res.json())
      .then(data => setTrendingTips(data))
      .catch(err => console.error(err));

    
    fetch('https://gardening-community-server-five.vercel.app/gardeners/featured?status=active&limit=6')
      .then(res => res.json())
      .then(data => setFeaturedGardeners(data))
      .catch(err => console.error(err));
  }, []);
  const events = [
    {
      id: 1,
      title: "Spring Planting Workshop",
      description: "Learn the best techniques for spring planting and soil preparation",
      date: "March 15, 2026",
      image: slider1,
      buttonText: "Register Now"
    },
    {
      id: 2,
      title: "Organic Composting Masterclass",
      description: "Master the art of creating nutrient-rich compost for your garden",
      date: "April 8, 2026",
      image: slider2,
      buttonText: "Learn More"
    },
    {
      id: 3,
      title: "Community Garden Meetup",
      description: "Connect with local gardeners and share your experiences",
      date: "April 22, 2026",
      image: slider3,
      buttonText: "Join Event"
    }
  ];

  return ( 
    <div className="transition-colors duration-300">
      
      <section className="relative">
       <Swiper
  modules={[Navigation, Pagination, Autoplay]}
  navigation
  pagination={{ clickable: true }}
  autoplay={{ delay: 5000, disableOnInteraction: false }}
  loop={true}
  className="h-[600px]"
>
  {events.map((event) => (
    <SwiperSlide key={event.id} className="!h-[600px]">
      <div className="relative w-full h-[600px] overflow-hidden">
        
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${event.image})`,
            
            backgroundBlendMode: 'normal'
          }}
        />

        
        <div className="absolute inset-0 bg-black/40" />

       
        <div className="relative z-10 flex items-center justify-center h-full px-4">
          <div className="text-center text-white px-4 max-w-4xl">
            <Calendar className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-5xl md:text-6xl font-bold mb-4">{event.title}</h2>
            <p className="text-xl md:text-2xl mb-4">{event.description}</p>
            <p className="text-lg mb-6 text-green-300">📅 {event.date}</p>
          </div>
        </div>
      </div>
    </SwiperSlide>
  ))}
</Swiper>

      </section>

      
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Users className="w-10 h-10 text-green-600 dark:text-green-400" />
              <h2 className="text-4xl font-bold text-green-700 dark:text-green-400">
                Featured Active Gardeners
              </h2>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Connect with our most active community members
            </p>
          </div>

          {featuredGardeners.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredGardeners.map((gardener) => (
                <div
                  key={gardener._id}
                  className="bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={gardener.profileImage || `https://ui-avatars.com/api/?name=${gardener.name}&size=80&background=22c55e&color=fff`}
                        alt={gardener.name}
                        className="w-20 h-20 rounded-full object-cover border-4 border-green-500"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                            {gardener.name}
                          </h3>
                          <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                            Active
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300 text-sm mt-1">
                          <MapPin className="w-4 h-4" />
                          <span>{gardener.location || "Location not set"}</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                      {gardener.bio || "Passionate about gardening and sharing knowledge with the community."}
                    </p>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-yellow-500 fill-current" />
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                          {gardener.rating || "5.0"} Rating
                        </span>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {gardener.tipsShared || 0} Tips Shared
                      </span>
                    </div>

                    <Link
                      to={`/gardeners/${gardener._id}`}
                      className="block w-full bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white text-center py-2 rounded-lg font-semibold transition"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No featured gardeners available at the moment.
            </p>
          )}
        </div>
      </section>

      {/* Top Trending Tips Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <TrendingUp className="w-10 h-10 text-green-600 dark:text-green-400" />
              <h2 className="text-4xl font-bold text-green-700 dark:text-green-400">
                Top Trending Tips
              </h2>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Most liked gardening tips from our community
            </p>
          </div>

          {trendingTips.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingTips.map((tip) => (
                <div
                  key={tip._id}
                  className="bg-white dark:bg-gray-700 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 overflow-hidden"
                >
                  <img
                    src={tip.imageUrl}
                    alt={tip.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-sm font-semibold">
                        {tip.category}
                      </span>
                      <div className="flex items-center gap-1 text-red-500">
                        <Heart className="w-5 h-5 fill-current" />
                        <span className="font-bold">{tip.totalLiked || 0}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white line-clamp-2">
                      {tip.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                      {tip.description}
                    </p>
                    <Link
                      to={`/tips/${tip._id}`}
                      className="text-green-600 dark:text-green-400 font-semibold hover:underline"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No trending tips yet. Be the first to share!
            </p>
          )}

          <div className="text-center mt-10">
            <Link
              to="/tips"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-bold text-lg transition transform hover:scale-105 shadow-lg inline-block"
            >
              View All Tips
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-green-700 dark:text-green-400">
            What We Offer
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-800 dark:to-gray-700 p-8 rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2">
              <Users className="w-16 h-16 text-green-600 dark:text-green-400 mb-4 mx-auto" />
              <h3 className="text-2xl font-bold mb-3 text-center text-green-700 dark:text-green-400">
                Find Local Gardeners
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-center">
                Connect with experienced gardeners in your community. Share experiences, 
                get advice, and build lasting relationships.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-800 dark:to-gray-700 p-8 rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2">
              <BookOpen className="w-16 h-16 text-green-600 dark:text-green-400 mb-4 mx-auto" />
              <h3 className="text-2xl font-bold mb-3 text-center text-green-700 dark:text-green-400">
                Share Knowledge
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-center">
                Learn and share gardening tips, plant care advice, and best practices 
                for composting, hydroponics, and more.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-800 dark:to-gray-700 p-8 rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2">
              <Calendar className="w-16 h-16 text-green-600 dark:text-green-400 mb-4 mx-auto" />
              <h3 className="text-2xl font-bold mb-3 text-center text-green-700 dark:text-green-400">
                Join Events
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-center">
                Participate in gardening workshops, community events, and seasonal 
                activities with fellow green thumbs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Topics Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-green-700 dark:text-green-400">
            Popular Topics
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Composting", icon: "♻️" },
              { name: "Hydroponics", icon: "💧" },
              { name: "Vertical Gardening", icon: "🏡" },
              { name: "Plant Care", icon: "🌿" },
              { name: "Pest Control", icon: "🐛" },
              { name: "Organic Gardening", icon: "🌾" }
            ].map((topic, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition text-center"
              >
                <div className="text-5xl mb-3">{topic.icon}</div>
                <h3 className="text-xl font-bold text-green-700 dark:text-green-400">{topic.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 dark:from-gray-800 dark:to-gray-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <Plus className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our growing community of passionate gardeners today!
          </p>
          <Link
            to="/auth/signup"
            className="bg-white text-green-600 px-10 py-4 rounded-lg font-bold text-lg hover:bg-green-50 transition transform hover:scale-105 shadow-lg inline-block"
          >
            Sign Up Now
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-green-600 dark:text-green-400 mb-2">500+</div>
              <div className="text-gray-600 dark:text-gray-300 font-semibold">Active Gardeners</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-green-600 dark:text-green-400 mb-2">1,200+</div>
              <div className="text-gray-600 dark:text-gray-300 font-semibold">Tips Shared</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-green-600 dark:text-green-400 mb-2">50+</div>
              <div className="text-gray-600 dark:text-gray-300 font-semibold">Events Hosted</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-green-600 dark:text-green-400 mb-2">100+</div>
              <div className="text-gray-600 dark:text-gray-300 font-semibold">Plant Varieties</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;