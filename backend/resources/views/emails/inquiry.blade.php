<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>New Project Inquiry</title>
</head>
<body style="font-family: 'Poppins', sans-serif; margin: 0; padding: 0; background-color: #f6f8fb;">
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
        <tr>
            <td align="center" style="padding: 40px 16px;">
                <table width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0;" role="presentation">
                    <tr>
                        <td align="center" style="padding: 32px 32px 24px;">
                            <h1 style="font-size: 24px; font-weight: 800; color: #0f172a; margin: 0 0 8px; text-transform: uppercase;">New Project Inquiry</h1>
                            <p style="font-size: 14px; color: #64748b; margin: 0;">Someone is interested in working with you.</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 0 32px 32px;">
                            <table width="100%" role="presentation">
                                <tr>
                                    <td style="padding: 8px 0; font-size: 14px; color: #475569; width: 140px;"><strong>Name:</strong></td>
                                    <td style="padding: 8px 0; font-size: 14px; color: #0f172a;">{{ $inquiry->name }}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; font-size: 14px; color: #475569; width: 140px;"><strong>Email:</strong></td>
                                    <td style="padding: 8px 0; font-size: 14px; color: #0f172a;">{{ $inquiry->email }}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; font-size: 14px; color: #475569; width: 140px;"><strong>Company:</strong></td>
                                    <td style="padding: 8px 0; font-size: 14px; color: #0f172a;">{{ $inquiry->company }}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; font-size: 14px; color: #475569; width: 140px;"><strong>Service:</strong></td>
                                    <td style="padding: 8px 0; font-size: 14px; color: #0f172a;">{{ $inquiry->service }}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; font-size: 14px; color: #475569; width: 140px;"><strong>Budget:</strong></td>
                                    <td style="padding: 8px 0; font-size: 14px; color: #0f172a;">{{ $inquiry->budget }}</td>
                                </tr>
                            </table>
                            <div style="padding-top: 24px; border-top: 1px solid #e2e8f0;">
                                <p style="font-size: 14px; color: #475569; margin-bottom: 8px;"><strong>Message:</strong></p>
                                <div style="padding: 16px; background-color: #f6f8fb; border-left: 4px solid #0891b2; border-radius: 8px; font-size: 14px; color: #0f172a; line-height: 1.6;">
                                    {!! $inquiry->message !!}
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="padding: 32px;">
                            <p style="font-size: 12px; color: #94a3b8; margin: 0;">Sent from the Malik Kashan portfolio contact form.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>