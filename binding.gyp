{
    'targets': [
        {
            'target_name': 'nodeloadertest',
            
            'sources': [
                "nodeloadertest-module/nodeloadertest.cpp",
                "nodeloadertest-module/NodeLoaderTestMain.cpp",
            ],

            "include_dirs": [
                "<!(node -e \"require('nan')\")"
            ],

            "defines": [
                "UNICODE",
                "DEBUG"
            ],

            'cflags!': ['-fno-exceptions'],
            'cflags!': ['-fno-rtti'],
            'cflags_cc!': ['-fno-exceptions'],
            'cflags_cc!': ['-fno-rtti'],

            'conditions': [
                ["OS=='win'", {
                    "defines": [
                        "_HAS_EXCEPTIONS=1"
                    ],

                    "configurations": {
                        "Debug": {
                        "msvs_settings": {
                            "VCCLCompilerTool": {
                            "RuntimeTypeInfo": "true",
                            'ExceptionHandling': 1
                            }
                        }
                        },
                        "Release": {
                        "msvs_settings": {
                            "VCCLCompilerTool": {
                            "RuntimeTypeInfo": "true",
                            'ExceptionHandling': 1
                            }
                        }
                        }
                    }
                }]
            ]
        }
    ]
}
