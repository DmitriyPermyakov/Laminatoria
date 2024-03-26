using Laminatoria.Infrastructure;
using MailKit.Net.Smtp;
using MimeKit;
using System.Text;

namespace Laminatoria.Services
{
    public class EmailService
    {
        public async Task SendEmail(SendingContacts contacts)
        {
            using var emailMessage = new MimeMessage();
            emailMessage.From.Add(new MailboxAddress(contacts.Name, "dmitrypermyakov1990@yandex.ru"));
            emailMessage.To.Add(new MailboxAddress("Admin", "dmitrypermyakov1990@yandex.ru"));
            emailMessage.Subject = "Заявка от клиeнта";



            emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Text)
            {
                Text = $"{contacts.Name}: {contacts.Phone}"
            };

            using (var client = new SmtpClient())
            {
                await client.ConnectAsync("smtp.yandex.ru", 587, false);
                await client.AuthenticateAsync("dmitrypermyakov1990@yandex.ru", "rmxspqunffadeewi");
                await client.SendAsync(emailMessage);
                await client.DisconnectAsync(true);
            }
        }

        public async Task SendPasswordAsync(string email)
        {
            using var emailMessage = new MimeMessage();
            emailMessage.From.Add(new MailboxAddress("Восстановление пароля", "dmitrypermyakov1990@yandex.ru"));
            emailMessage.To.Add(new MailboxAddress("Admin", email));
            emailMessage.Subject = "Восстановление пароля с сайта Laminatoria";

            string newPassword = this.GeneratePassword();

            emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Text)
            {
                Text = newPassword
            };

            using (var client = new SmtpClient())
            {
                await client.ConnectAsync("smtp.yandex.ru", 587, false);
                await client.AuthenticateAsync("dmitrypermyakov1990@yandex.ru", "rmxspqunffadeewi");
                await client.SendAsync(emailMessage);
                await client.DisconnectAsync(true);
            }

        }


        private string GeneratePassword()
        {
            int length = 12;
            
            StringBuilder str_build = new StringBuilder();
            Random random = new Random();

            char letter;

            for (int i = 0; i < length; i++)
            {
                double flt = random.NextDouble();
                int shift = Convert.ToInt32(Math.Floor(25 * flt));
                letter = Convert.ToChar(shift + 65);
                str_build.Append(letter);
            }
            Console.WriteLine(str_build.ToString());

            return str_build.ToString();
        }
    }
}
