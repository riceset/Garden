---
title: "My Karabiner Setup"
date: 2024/1/21
tags: [karabiner]
---
#  My Karabiner Setup

![[karabiner.png]]

These rules are made for a JIS MacBook keyboard.

## Simple Rules

The only simple rule I made was switching the left control key to caps lock.

## Rules for Vim Users

Changing control (^) to hyper:

```json
{
	"description": "HYPER",
	"manipulators": [
		{
			"from": {
				"key_code": "left_control",
				"modifiers": {}
			},
			"to": [
				{
					"key_code": "left_shift",
					"modifiers": [
						"left_command",
						"left_control",
						"left_option"
					]
				}
			],
			"to_if_alone": [
				{
					"key_code": "escape"
				}
			],
			"type": "basic"
		},
		{
			"from": {
				"key_code": "comma",
				"modifiers": {
					"mandatory": [
						"command",
						"shift",
						"option",
						"control"
					]
				}
			},
			"to": [],
			"type": "basic"
		},
		{
			"from": {
				"key_code": "period",
				"modifiers": {
					"mandatory": [
						"command",
						"shift",
						"option",
						"control"
					]
				}
			},
			"to": [],
			"type": "basic"
		},
		{
			"from": {
				"key_code": "slash",
				"modifiers": {
					"mandatory": [
						"command",
						"shift",
						"option",
						"control"
					]
				}
			},
			"to": [],
			"type": "basic"
		}
	]
}
```

> [!note] Info
> The hyper key is a key that combines shift, command, option and control and acts as a modifier key. When pressed alone it becomes a escape key.

Using Vim keys + super for navigation:

```json
{
	"description": "Vim keys",
	"manipulators": [
		{
			"from": {
				"key_code": "k",
				"modifiers": {
					"mandatory": [
						"left_shift",
						"left_command",
						"left_control",
						"left_option"
					]
				}
			},
			"to": [
				{
					"key_code": "up_arrow"
				}
			],
			"type": "basic"
		},
		{
			"from": {
				"key_code": "h",
				"modifiers": {
					"mandatory": [
						"left_shift",
						"left_command",
						"left_control",
						"left_option"
					]
				}
			},
			"to": [
				{
					"key_code": "left_arrow"
				}
			],
			"type": "basic"
		},
		{
			"from": {
				"key_code": "j",
				"modifiers": {
					"mandatory": [
						"left_shift",
						"left_command",
						"left_control",
						"left_option"
					]
				}
			},
			"to": [
				{
					"key_code": "down_arrow"
				}
			],
			"type": "basic"
		},
		{
			"from": {
				"key_code": "l",
				"modifiers": {
					"mandatory": [
						"left_shift",
						"left_command",
						"left_control",
						"left_option"
					]
				}
			},
			"to": [
				{
					"key_code": "right_arrow"
				}
			],
			"type": "basic"
		},
		{
			"from": {
				"key_code": "semicolon",
				"modifiers": {
					"mandatory": [
						"left_shift",
						"left_command",
						"left_control",
						"left_option"
					]
				}
			},
			"to": [
				{
					"key_code": "right_arrow",
					"modifiers": [
						"left_command"
					]
				}
			],
			"type": "basic"
		}
	]
}
```

> [!tip] Usage
> Just hold control + h / j / k / l to navigate on a scroll view.

Toggling caps lock with left shift + right shift:

```json
{
	"description": "Toggle caps lock",
	"manipulators": [
		{
			"from": {
				"key_code": "left_shift",
				"modifiers": {
					"mandatory": [
						"right_shift"
					],
					"optional": [
						"caps_lock"
					]
				}
			},
			"to": [
				{
					"key_code": "caps_lock"
				}
			],
			"to_if_alone": [
				{
					"key_code": "left_shift"
				}
			],
			"type": "basic"
		},
		{
			"from": {
				"key_code": "right_shift",
				"modifiers": {
					"mandatory": [
						"left_shift"
					],
					"optional": [
						"caps_lock"
					]
				}
			},
			"to": [
				{
					"key_code": "caps_lock"
				}
			],
			"to_if_alone": [
				{
					"key_code": "right_shift"
				}
			],
			"type": "basic"
		}
	]
}
```

## Rules for Chinese learners

Switching to Simplified Chinese (Pinyin) pressing かな twice:

```json
{
	"description": "kana twice to simplified",
	"manipulators": [
		{
			"conditions": [
				{
					"name": "japanese_kana pressed",
					"type": "variable_if",
					"value": 1
				}
			],
			"from": {
				"key_code": "japanese_kana"
			},
			"to": [
				{
					"select_input_source": {
						"language": "zh-Hans"
					}
				}
			],
			"type": "basic"
		},
		{
			"from": {
				"key_code": "japanese_kana"
			},
			"to": [
				{
					"set_variable": {
						"name": "japanese_kana pressed",
						"value": 1
					}
				},
				{
					"key_code": "japanese_kana"
				}
			],
			"to_delayed_action": {
				"to_if_canceled": [
					{
						"set_variable": {
							"name": "japanese_kana pressed",
							"value": 0
						}
					}
				],
				"to_if_invoked": [
					{
						"set_variable": {
							"name": "japanese_kana pressed",
							"value": 0
						}
					}
				]
			},
			"type": "basic"
		}
	]
}
```

Switching to Traditional Chinese (Pinyin) pressing 英数 twice:

```json
{
	"description": "eisuu twice to traditional",
	"manipulators": [
		{
			"conditions": [
				{
					"name": "japanese_eisuu pressed",
					"type": "variable_if",
					"value": 1
				}
			],
			"from": {
				"key_code": "japanese_eisuu"
			},
			"to": [
				{
					"select_input_source": {
						"language": "zh-Hant"
					}
				}
			],
			"type": "basic"
		},
		{
			"from": {
				"key_code": "japanese_eisuu"
			},
			"to": [
				{
					"set_variable": {
						"name": "japanese_eisuu pressed",
						"value": 1
					}
				},
				{
					"key_code": "japanese_eisuu"
				}
			],
			"to_delayed_action": {
				"to_if_canceled": [
					{
						"set_variable": {
							"name": "japanese_eisuu pressed",
							"value": 0
						}
					}
				],
				"to_if_invoked": [
					{
						"set_variable": {
							"name": "japanese_eisuu pressed",
							"value": 0
						}
					}
				]
			},
			"type": "basic"
		}
	]
}
```
