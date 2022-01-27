<?
header("Access-Control-Allow-Origin: *"); 
// HTTP_ORIGIN
// REMOTE_ADDR
// REQUEST_METHOD
// print_r(json_encode($_SERVER));

define('TELEGRAM_TOKEN_TO', '5174947430:AAGRwIsyVi3mfoAWZ_H0JQkVpPzD6SC4SFw');

function message_to_telegram($text)
{
	$arr_chat = "381762556,57815731";
	if($arr_chat) {
		$arr_chat = explode(",",$arr_chat);
	    $ch = curl_init();
		
		$chatSend = TELEGRAM_TOKEN_TO;
		
		for ($i = 0; $i<count($arr_chat); $i++) {
		    curl_setopt_array(
		        $ch,
		        array(
		            CURLOPT_URL => 'https://api.telegram.org/bot' . $chatSend . '/sendMessage',
		            CURLOPT_POST => TRUE,
		            CURLOPT_RETURNTRANSFER => TRUE,
		            CURLOPT_TIMEOUT => 10,
		            CURLOPT_POSTFIELDS => array(
		                'chat_id' => trim($arr_chat[$i]),
		                'text' => $text,
		            ),
		        )
		    );
		    $output = curl_exec($ch);
		}
	}
}

if (
    ($_SERVER["HTTP_ORIGIN"] !== "http://localhost:3000")&&
    ($_SERVER["HTTP_ORIGIN"] !== "https://propuskmkad-pro.ru") 
    
    ) {
        http_response_code(403);
        die($_SERVER["HTTP_ORIGIN"]);
    }


    $to = 'asmi046@gmail.com, propuskmkad-pro@yandex.ru'; 
    $subject = 'Обращение с сайта PropuskMkad-Pro.ru';
    $message = '
                <html>
                    <head>
                        <title>'.$_REQUEST["msg"].'</title>
                    </head>
                    <body>
                        <p>Имя: '.$_REQUEST['name'].'</p>
                        <p>Телефон: '.$_REQUEST['tel'].'</p> 
                        <p>e-mail: '.$_REQUEST['mail'].'</p>                   
                        <p>ГосНомер: '.$_REQUEST['number'].'</p>                   
                        <p>Форма: '.$_REQUEST['msg'].'</p>                   
                    </body>
                </html>'; 

                $messageBot = $_REQUEST["msg"].
                        "\nИмя: ".$_REQUEST['name'].
                        "\nТелефон: ".$_REQUEST['tel'].
                        "\nE-mail: ".$_REQUEST['mail'].
                        "\nГосномер: ".$_REQUEST['number'].
                        "\nСообщение: ".$_REQUEST['msg']; 

        $headers  = "Content-type: text/html; charset=utf-8 \r\n"; 
        $headers .= "From: Заявка с сайта Пропуска МКАД <noreply@propuskmkad-pro.ru>\r\n";
        message_to_telegram($messageBot);
        if (mail($to, $subject, $message, $headers)) {
            http_response_code(200);
            die(array());
        } else {
            http_response_code(403);
            die(array());
        }



?>