import React, { Component } from 'react'
import {push} from 'react-router-redux'
import Link from 'react-router/lib/Link'
import { baseRoute } from '../../../utils/route'
import {language, ln, dir} from '../../../utils/language'
import { siteConfig } from '../../../utils/siteConfig'

export default class AboutPage extends Component {
  render() {
    return (
      <div>
        <section className="content-header">
          <h1>
            {ln('about')}&nbsp;
            {siteConfig.key != 'mtn' &&
              <small>{ln('controlPanel')}</small>
            }
          </h1>
          <ol className="breadcrumb">
            <li><Link to={`/${baseRoute.active}`}>{ln('home')}</Link></li>
            <li className="active">{ln('about')}</li>
          </ol>
        </section>
        <section className="content" style={{direction: ln('direction')}}>
        <div className="box">
          <div className="box-body" style={{padding: 20, textAlign: 'justify', color: '#323232'}}>
            <h4>
              {ln('aboutus')}
            </h4>
            <hr/>
            {siteConfig.key == 'mtn'?
              <span>
                {language.key == 'fa'?
                  <span>
                    با پیشرفت فناوری اطلاعات، رشد روز افزون تولید داده و شکل‌گیری داده‌های عظیم (Big Data)، ذخیره‌سازی هرچه دقیق‌تر داده‌ها نزد سازمان‌ها اهمیت ویژه‌ای یافت. در عین حال، هزینه تامین و نگهداری مراکز داده اختصاصی و همچنین بحث تامین امنیت اطلاعات به چالشی بزرگ برای سازمان‌ها تبدیل شد. این نیازها منجر به پیدایش فناوری‌های ابری شد که به شرکت‌ها اجازه می‌دهد بدون نیاز به ایجاد مراکز داده اختصاصی، اطلاعات خود را بر روی ذخیره‌سازهای مجازی با ضریب پایداری بالا ذخیره کرده و در هر لحظه به این اطلاعات دسترسی داشته باشند.
                    <br/>
                    <br/> شرکت
                    &nbsp;
                    <a href="http://irancell.ir" target="_blank">
                    ایرانسل
                    </a>
                    &nbsp;
                    به عنوان برترین اپراتور دیتای کشور و پیشرو در ارائه راهکارهای نوین سازمانی با همکاری شرکت وزین
                    &nbsp;<a href="http://persiangig.com" target="_blank">
                    پرشین گیگ</a>،&nbsp;
                    هم‌گام با رشد فناوری‌های ابری  در عرصه جهانی، اقدام به فراهم‌سازی بستر لازم جهت ارائه خدمات ذخیره‌سازی ابری به سازمان‌های داخلی کرده است، این تکنولوژی توسط متخصصان داخلی شرکت پرشین گیگ تولید و ارائه گردیده است. ایرانسل با هدف توانمندسازی کسب‌وکارهای داخلی، حراست از داده‌های ارزشمند آنها و عدم وابستگی آنها به سرویس‌های خارجی که عموما با هزینه، محدودیت‌ و عدم پشتیبانی مناسب همراه هستند، خدمات ذخیره‌سازی ابری ایرانسل (MAAD) را با تکنولوژی کاملاً بومی  به کلیه شرکت‌های داخلی ارائه می‌کند.
                    <br/>
                    <br/> امید است با ارائه خدمات ابری امن، پایدار و مقرون به صرفه، قدمی بزرگ در راستای حراست از اطلاعات شرکت های داخلی برداریم.
                    <br/>
                    <br/>
                  </span>
                  :
                  <span>
                    The ever increasing enterprise (and SME) demand for large-scale storage systems and big-data storage - on secure and scalable platforms - has become an important business requirement for sustaining the growth of data, and business IT needs.
                    <br/>
                    This fundamental need has become a challenge for organizations, and the cost of building, maintenance, and expansion of dedicated hardware, software, and data centers continues to increase.   As the Cloud concept emerged, these business requirements and challenges have propelled the use of Cloud technologies, enabling companies to store and access their data ANYWHERE, ANYTIME, from highly stable and scalable Private Cloud Platforms, without a need to create and maintain dedicated data centers and purchase expensive storage solutions and licenses.
                    <br/>
                    <a href="http://irancell.ir" target="_blank">
                    Irancell</a>, as the best Data Operator of the country and the leading provider of innovative business solutions, has partnered with <a href="http://persiangig.com" target="_blank">PersianGig</a> - the oldest and largest Cloud Services local brand - and has launched a Cloud Storage solution, in line with the leading solutions in the global arena, in order to provide Cloud Storage services to our customers.  With the goal of empowering our business customers, protecting their valuable data within our network, rather than external services, which are generally less cost-effective, limited, and inadequately supported, Irancell Co. provides Irancell Cloud Storage Service (MAAD) with native technology to all business customers.
                    <br/>

                    We look forward to providing a secure, sustainable, and affordable cloud service, which a great step towards protecting the information of our business customers.
                    <br/>
                    <br/>

                  </span>
                }
              </span>
              :
              <span>
                {language.key == 'fa'?
                  <span style={{padding: 2}}>

                      پرشین‌گیگ بزرگترین سرویس دهنده فضای وب فارسی (هاستینگ) است. اگر از قدیمیتر‌ها و حرفه ‎ای‎ های وب بپرسید، پی جی را مخزنی آنلاین، مطمئن و سریع برای فایل ها و اطلاعات‎شان معرفی خواهند کرد. به هر حال گروه حرفه‌‎ای هستید یا از قوم قدیمی‌‎ها، پرشین‌گیگ خانه‎‎‌ای برای شماست؛ خوش آمدید.
  تاسیس پرشین‌گیگ در زمانی خاص روی داد؛ تعداد کاربران اینترنتی به سرعت رو به افزایش بود، حرفه‌‎ای‌‎ها و وب-کارها مشغول تولید محتوای آموزشی در اینترنت بودند، و وبلاگ نویسی و وبلاگ خوانی در اوج محبوبیت بود. در آن شرایط، موانعی نیز وجود داشت؛ نبود سرویس فضای رایگان وب برای کاربران فارسی زبان از مهمترین این موارد بود. با راه اندازی سایت پرشین‌گیگ در بهمن ماه ۱۳۸۳، بنای سرویس قدرتمند و رایگان فضای وب فارسی گذاشته شد. در مدت کوتاهی دعوتنامه‎‌های پرشین‌گیگ دست به دست بین کاربران اینترنت پخش می‌‎شد. مدیر پرشین‌گیگ یکی‌‎یکی، و کاربران عزیزمان دسته‌دسته متخصصین و وبلاگ نویسان را به عضویت دعوت می‎‌کردند. اکنون پس از گذشت چندین سال از راه‌‎اندازی و سرویس‌‎دهی، خدمتی جدید از تیم پرشین‌گیگ با عنوان سرویس ابری میزبان کاربران جدید فضای وب فارسی می‌‎باشد، سرویسی که با استفاده از به روزترین تکنولوژی‎‌های موجود طراحی و پیاده سازی شده است، ۸ گیگ فضای رایگان، قابلیت نمایش مناسب بر روی تمامی دستگاه‎‌ها و اشتراک گذاری فایل‎‌ها با دیگر کاربران این سرویس از حداقل امکانات جذاب این سرویس است.

                  </span>
                  :
                  <span>
                    PersianGig is the largest Persian web hosting server. If you ask the webmasters and web professionals, they offer PG as an online, safe, rapid and secure storage for your files and information.
                    Anyway, whether you are a professional or old user, PersianGig is a home for you. Welcome.
                    The establishment of the PersianGig occurred at a specific time; the number of Internet users was growing rapidly, professionals and websites were producing content on the Internet, and blogging was at the peak of popularity.
                    In those circumstances, there were also barriers; the lack of free web space services for Persian language users was one of the most important ones.
                    With the launch of PersianGig website in February 2004, the powerful and free Persian web space service was held.
                    Shortly afterwards, the PersianGig invitations were shared between Internet users.
                    PersianGig's manager was inviting experts and bloggers to join one by one, and our beloved users were inviting group by group.
                    Now, after several years of launch and service, a new service from the PersianGig team, Cloud Service, is hosting new users of Persian web storage, a service that is designed and implemented using the latest available technologies.
                    8GB free space, the ability to display on all devices and share files with other users are from the least attractive features of this service.
                  </span>
              }
            </span>
            }
          </div>
        </div>
      </section>
      </div>
    )
  }
}
